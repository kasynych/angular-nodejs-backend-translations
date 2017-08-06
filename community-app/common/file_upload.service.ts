import { Component } from "@angular/core";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/share";

import { ServiceBase } from "./service_base";

@Injectable()
export /**
 * File Upload Service class
 * @class
 */
class FileUploadService extends ServiceBase {
  private get_signed_request_url = this.getApiUrl() + "/api/aws-s3/sign-s3";
  /**
   * @param Observable<number>
   */
  private state$: Observable<any>;

  private progress$: Observable<number>;

  /**
   * @type {astring}
   */
  private state: string = "";

  private progressObserver: any;

  private stateObserver: any;

  /**
   * @constructs FileUploadService
   */
  constructor() {
    super();
    this.state$ = new Observable(observer => {
      this.stateObserver = observer;
    });

    this.progress$ = new Observable(observer => {
      this.progressObserver = observer;
    });
  }

  /**
   * @returns {Observable<any>}
   */
  public getStateObservable(): Observable<any> {
    return this.state$;
  }

  /**
   * @returns {Observable<number>}
   */
  public getObservable(): Observable<number> {
    return this.progress$;
  }

  /**
   * @param file 
   * @returns {Promise<any>}
   */
  upload(file): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getSignedRequest(file)
        .then(res1 => {
          this.state = "Got signed request from Amazon S3";
          this.stateObserver.next(this.state);
          this.progressObserver.next(0);
          this.uploadFile(file, res1.signedRequest, res1.url)
            .then(() => {
              resolve({
                success: "File uploaded",
                data: {
                  filename: res1.filename,
                  filetype: res1.filetype,
                  url: res1.url
                }
              });
            })
            .catch(() => {
              reject();
            });
        })
        .catch(res => reject(res));
    });
  }

  /**
   * 
   * @param file 
   * @returns {Promise<any>}
   */
  getSignedRequest(file): Promise<any> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(
        "GET",
        this.get_signed_request_url +
          `?file-name=${encodeURIComponent(
            file.name
          )}&file-type=${encodeURIComponent(file.type)}`
      );
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } else {
            reject("Could not get signed URL.");
          }
        }
      };

      xhr.send();
    });
  }

  /**
   * 
   * @param file 
   * @param signedRequest 
   * @param url 
   * @returns {Promise<any>}
   */
  uploadFile(file, signedRequest, url): Promise<any> {
    let obj = this;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", signedRequest);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            if (xhr.status === 200) {
              resolve();
              this.state = "Uploaded file to Amazon S3 Bucket";
              this.stateObserver.next(this.state);
            } else {
              reject();
            }
          } else {
            alert("Could not upload file.");
          }
        }
      };
      xhr.addEventListener(
        "progress",
        function(e) {
          obj.progressObserver.next(e.loaded / e.total);
        },
        false
      );
      if (xhr.upload) {
        xhr.upload.onprogress = function(e) {
          obj.progressObserver.next(e.loaded / e.total);
        };
      }
      xhr.send(file);
    });
  }
}
