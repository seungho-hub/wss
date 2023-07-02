import { generateURL } from '../url';
import ApiInterface, { ApiInfo } from './apiInterface';
import axios, { AxiosRequestConfig } from 'axios';

interface kakaoAPIInfo extends ApiInfo {
  apiBaseUrl: string;
  authBaseUrl: string;
  redirectUrl: string;
  state: string;
}

class KakaoInterface extends ApiInterface {
  apiBaseUrl: string;
  authBaseUrl: string;
  redirectUrl: string;
  state: string;

  constructor(apiInfo: kakaoAPIInfo) {
    super(apiInfo);
    this.apiBaseUrl = apiInfo.apiBaseUrl;
    this.authBaseUrl = apiInfo.authBaseUrl;
    this.redirectUrl = apiInfo.redirectUrl;
    this.state = apiInfo.state;
  }

  get authCodeURL() {
    return generateURL(`${this.authBaseUrl}/authorize`, {
      client_id: this.clientId,
      response_type: 'code',
      redirect_uri: this.redirectUrl,
      state: this.state,
    });
  }

  accessTokenURL(code: string) {
    return generateURL(`${this.authBaseUrl}/token`, {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      code,
      redirect_uri: this.redirectUrl,
      grant_type: 'authorization_code',
    });
  }

  async getAccessToken(code: string) {
    const endpoint = this.accessTokenURL(code);

    const reqConfig: AxiosRequestConfig = {
      url: endpoint,
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    };

    const response = await axios(reqConfig);
    const accessToken = response.data.access_token;

    return accessToken;
  }

  async getUserProfile(accessToken: string) {
    return 'ss';
  }
}

export default KakaoInterface;