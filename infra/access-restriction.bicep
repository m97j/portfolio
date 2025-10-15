targetScope = 'resourceGroup'

@description('Backend App Service name')
param backendAppName string

@description('Frontend outbound IPs')
param frontendOutboundIps array

resource backendApp 'Microsoft.Web/sites@2022-09-01' existing = {
  name: backendAppName
}

// 먼저 허용 규칙 배열을 변수로 정의
var allowFrontendIps = [
  for ip in frontendOutboundIps: {
    name: 'Allow-Frontend-${ip}'
    action: 'Allow'
    ipAddress: '${ip}/32'
    priority: 100
    description: 'Allow only Frontend outbound IP'
  }
]

// Access Restriction 규칙 추가
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
