export type Environment = 'production' | 'development'

export const PRODUCTION = 'production'
export const DEVELOPMENT = 'development'

export const currentEnvironment = (): Environment => {
  let environment: Environment = process.env.NODE_ENV as Environment
  if (environment !== PRODUCTION) {
    environment = DEVELOPMENT
  }
  return environment
}

export const isDevelopment = (): boolean => currentEnvironment() === DEVELOPMENT

export const isProduction = (): boolean => currentEnvironment() === PRODUCTION
