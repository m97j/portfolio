targetScope = 'subscription'

param resourceGroupLocation string

resource rg 'Microsoft.Resources/resourceGroups@2024-11-01' = {
  name: 'portfolio-rg'
  location: resourceGroupLocation
}

module infra 'infra-rg.bicep' = {
  name: 'infraDeployment'
  scope: rg
  params: {
    registryName: 'portfolioacrn3r0m8x'
    frontendAppName: 'portfolio-frontend'
    backendAppName: '3mj-portfolio-front-app08'
    postgresName: 'nrmx308-pg-pf'
    postgresDbName: 'portfolio'
    administratorLogin: 'pgadmin'
    administratorLoginPassword: administratorLoginPassword
    storageAccountName: 'portfoliostorage3m0j8' // (전역 유일)
    storageContainerName: 'portfolio-media'
    keyVaultName: 'portfolio-kv'
    jwtSecret: jwtSecret
  }
}

@secure()
param administratorLoginPassword string

@secure()
param jwtSecret string
