import getConfig from 'next/config';
import { Environment, GLOBAL_DOMAIN } from './environment';
import { isServer } from '@/lib/is-server';

export enum NodeEnv {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production'
}

export interface Config {
  APP_ENV: Environment;
  ADMIN_EMAIL: string;
  API_URL: string;
  // APP_VARIANT_ID: string;
  // API_CONTENT_URL: string;
  // API_IMAGES_URL: string;
  // APP_URL: string;
  // FROM_PRICE_NIGHTS: number;
  // MAP_BOX_API_KEY: string;
  // GOOGLE_RE_CAPTCHA: string;
  // GOOGLE_GTM: string;
  // ALGOLIA_APP_ID: string;
  // ALGOLIA_API_KEY: string;
  // CONTENTFUL_SPACE: string;
  // CONTENTFUL_ACCESS_TOKEN: string;
  // BARCLAYS_ALIAS_GATEWAY: string;
  // BARCLAYS_PSPID: string;
  // TRUSTPILOT_TEMPLATE_ID: string;
  // TRUSTPILOT_BUSINESSUNIT_ID: string;
  // TRACE_SAMPLE_RATE: string;
  // SENTRY_DSN: string;
  // SENTRY_APP_ENV: string;
  // SENTRY_AUTH_TOKEN: string;
}


export class EnvConfig {
  public static get(): Config {
    if (isServer) {
      if (process.env.NODE_ENV === NodeEnv.DEVELOPMENT) {
        const nights = process.env.FROM_PRICE_NIGHTS || '0';
        return {
          APP_ENV: Environment.LOCAL,
          ADMIN_EMAIL: process.env?.ADMIN_EMAIL || 'admin@example.com',
          API_URL: process.env?.API_URL || 'http://localhost:8000',
          // API_CONTENT_URL: process?.env.API_CONTENT_URL || '',
          // API_IMAGES_URL: process?.env.API_IMAGES_URL || '',
          // APP_URL: process.env?.APP_URL || 'http://localhost:3000',
          // APP_VARIANT_ID: process.env?.APP_VARIANT_ID || '',
          // FROM_PRICE_NIGHTS: parseInt(nights),
          // MAP_BOX_API_KEY: process.env?.MAP_BOX_API_KEY || '',
          // GOOGLE_GTM: process.env?.GOOGLE_GTM || '',
          // GOOGLE_RE_CAPTCHA: process.env?.GOOGLE_RE_CAPTCHA || '',
          // ALGOLIA_APP_ID: process.env?.ALGOLIA_APP_ID || '',
          // ALGOLIA_API_KEY: process.env?.ALGOLIA_API_KEY || '',
          // CONTENTFUL_SPACE: process.env?.CONTENTFUL_SPACE || '',
          // CONTENTFUL_ACCESS_TOKEN: process.env?.CONTENTFUL_ACCESS_TOKEN || '',
          // BARCLAYS_ALIAS_GATEWAY: process.env?.BARCLAYS_ALIAS_GATEWAY || '',
          // BARCLAYS_PSPID: 'epdq1046931',
          // TRUSTPILOT_TEMPLATE_ID: process.env?.TRUSTPILOT_TEMPLATE_ID || '',
          // TRUSTPILOT_BUSINESSUNIT_ID: process.env?.TRUSTPILOT_BUSINESSUNIT_ID || '',
          // TRACE_SAMPLE_RATE: process.env?.TRACE_SAMPLE_RATE || '',
          // SENTRY_DSN: process.env?.SENTRY_DSN || '',
          // SENTRY_APP_ENV: process.env?.SENTRY_APP_ENV || '',
          // SENTRY_AUTH_TOKEN: process.env?.SENTRY_AUTH_TOKEN || ''
        };
      }
    }
    const prConfig = getConfig()?.publicRuntimeConfig;
    return {
      APP_ENV: prConfig?.APP_ENV || '',
      ADMIN_EMAIL: process.env?.ADMIN_EMAIL || 'admin@example.com',
      API_URL: prConfig?.API_URL || '',
      // API_CONTENT_URL: prConfig?.API_CONTENT_URL || '',
      // API_IMAGES_URL: prConfig?.API_IMAGES_URL || '',
      // APP_URL: prConfig?.APP_URL || '',
      // APP_VARIANT_ID: prConfig?.APP_VARIANT_ID || '',
      // FROM_PRICE_NIGHTS: prConfig?.FROM_PRICE_NIGHTS || 0,
      // MAP_BOX_API_KEY: prConfig?.MAP_BOX_API_KEY || '',
      // GOOGLE_GTM: prConfig?.GOOGLE_GTM || '',
      // GOOGLE_RE_CAPTCHA: prConfig?.GOOGLE_RE_CAPTCHA || '',
      // ALGOLIA_APP_ID: prConfig?.ALGOLIA_APP_ID || '',
      // ALGOLIA_API_KEY: prConfig?.ALGOLIA_API_KEY || '',
      // CONTENTFUL_SPACE: prConfig?.CONTENTFUL_SPACE || '',
      // CONTENTFUL_ACCESS_TOKEN: prConfig?.CONTENTFUL_ACCESS_TOKEN || '',
      // BARCLAYS_ALIAS_GATEWAY: prConfig?.BARCLAYS_ALIAS_GATEWAY || '',
      // BARCLAYS_PSPID: 'epdq1046931',
      // TRUSTPILOT_TEMPLATE_ID: prConfig?.TRUSTPILOT_TEMPLATE_ID || '',
      // TRUSTPILOT_BUSINESSUNIT_ID: prConfig?.TRUSTPILOT_BUSINESSUNIT_ID || '',
      // TRACE_SAMPLE_RATE: prConfig?.TRACE_SAMPLE_RATE || '',
      // SENTRY_DSN: prConfig?.SENTRY_DSN || '',
      // SENTRY_APP_ENV: prConfig?.SENTRY_APP_ENV || '',
      // SENTRY_AUTH_TOKEN: prConfig?.SENTRY_AUTH_TOKEN || ''
    };
  }

  public static isProd(): boolean {
    return EnvConfig.get().APP_ENV === Environment.PRODUCTION;
  }

  public static isDev(): boolean {
    return EnvConfig.get().APP_ENV === Environment.DEVELOP;
  }

  public static isLocal(): boolean {
    return EnvConfig.get().APP_ENV === Environment.LOCAL;
  }

  public static getGlobalDomainForEnvironment(): string {
    const prefix = this.isProd() ? 'www' : 'dev';
    return `https://${prefix}${GLOBAL_DOMAIN}`;
  }
}
