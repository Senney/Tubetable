import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public Server: string = 'http://localhost:8080/';
    public ApiPath: string = 'tubetable/api/';
    public ApiVersion: string = 'v1.0/';
    public ApiServer: string = this.Server + this.ApiPath + this.ApiVersion;
}
