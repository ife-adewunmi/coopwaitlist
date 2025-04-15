import getConfig from 'next/config'
import { Environment, GLOBAL_DOMAIN } from './environment'
import { isServer } from '@/lib/is-server'

export enum NodeEnv {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

export interface Config {
  ADMIN_EMAIL: string | Array<string>
  APP_ENV: Environment
  APP_URL: string
  DATA_ENCRYPTION_KEY: string
  EMAIL_PROVIDER: string
}

export class EnvConfig {
  public static get(): Config {
    if (isServer) {
      if (process.env.NODE_ENV === NodeEnv.DEVELOPMENT) {
        const nights = process.env.FROM_PRICE_NIGHTS || '0'
        return {
          APP_ENV: Environment.LOCAL,
          ADMIN_EMAIL: process.env.ADMIN_EMAIL
            ? process.env.ADMIN_EMAIL.split(',')
            : 'admin@example.com',
          APP_URL: process.env?.APP_URL || '',
          DATA_ENCRYPTION_KEY: process.env?.DATA_ENCRYPTION_KEY || '',
          EMAIL_PROVIDER: process.env?.EMAIL_PROVIDER || '',
        }
      }
    }
    const prConfig = getConfig()?.publicRuntimeConfig
    return {
      APP_ENV: prConfig?.APP_ENV || '',
      ADMIN_EMAIL: prConfig.ADMIN_EMAIL ? prConfig.ADMIN_EMAIL.split(',') : 'admin@example.com',
      APP_URL: prConfig?.APP_URL || '',
      DATA_ENCRYPTION_KEY: prConfig?.DATA_ENCRYPTION_KEY || '',
      EMAIL_PROVIDER: prConfig?.EMAIL_PROVIDER || '',
    }
  }

  public static isProd(): boolean {
    return EnvConfig.get().APP_ENV === Environment.PRODUCTION
  }

  public static isDev(): boolean {
    return EnvConfig.get().APP_ENV === Environment.DEVELOP
  }

  public static isLocal(): boolean {
    return EnvConfig.get().APP_ENV === Environment.LOCAL
  }

  public static getGlobalDomainForEnvironment(): string {
    const prefix = this.isProd() ? 'www' : 'dev'
    return `https://${prefix}${GLOBAL_DOMAIN}`
  }
}
