targetScope = 'resourceGroup'

@description('Backend App Service name')
param backendAppName string

@description('Frontend outbound IPs')
param frontendOutboundIps array

resource backendApp 'Microsoft.Web/sites@2022-09-01' existing = {
  name: backendAppName
}

var allowFrontendIps = [
  for (ip, i) in frontendOutboundIps: {
    name: guid(backendApp.id, ip)   // 안전한 규칙 이름
    action: 'Allow'
    ipAddress: '${ip}/32'
    priority: 100 + i               // 규칙마다 우선순위 다르게
    description: 'Allow only Frontend outbound IP'
  }
]

resource backendAccessRestrictions 'Microsoft.Web/sites/config@2022-09-01' = {
  name: 'web'
  parent: backendApp
  properties: {
    ipSecurityRestrictions: concat(
      allowFrontendIps,
      [
        {
          name: 'Deny-All'
          action: 'Deny'
          ipAddress: '0.0.0.0/0'
          priority: 200
          description: 'Deny all other traffic'
        }
      ]
    )
  }
}
