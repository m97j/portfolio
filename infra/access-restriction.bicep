targetScope = 'resourceGroup'

@description('Backend App Service name')
param backendAppName string

@description('Frontend outbound IPs (comma-separated string)')
param frontendOutboundIps string

resource backendApp 'Microsoft.Web/sites@2022-09-01' existing = {
  name: backendAppName
}

// 문자열을 배열로 변환
var ipArray = split(frontendOutboundIps, ',')

var allowFrontendIps = [
  for (ip, i) in ipArray: {
    name: guid(backendApp.id, ip)
    action: 'Allow'
    ipAddress: '${ip}/32'
    priority: 100 + i
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
