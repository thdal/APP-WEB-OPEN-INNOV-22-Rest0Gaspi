import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { getApiAccesToken } from 'src/app/shared/utils';
import {environment} from "../../../environments/environment";

/**
 * This class lets you add a security layer from gandalf. Without this headers
 * you will not authorized to access the API.
 *                         ,---.
 *                        /    |
 *                       /     |
 *   Gandalf            /      |
 *                     /       |
 *                ___,'        |
 *              <  -'          :
 *               `-.__..--'``-,_\_
 *                  |o/ ` :,.)_`>
 *                  :/ `     ||/)
 *                  (_.).__,-` |\
 *                  /( `.``   `| :
 *                  \'`-.)  `  ; ;
 *                  | `       /-<
 *                  |     `  /   `.
 *  ,-_-..____     /|  `    :__..-'\
 * /,'-.__\\  ``-./ :`      ;       \
 * `\ `\  `\\  \ :  (   `  /  ,   `. \
 *   \` \   \\   |  | `   :  :     .\ \
 *    \ `\_  ))  :  ;     |  |      ): :
 *   (`-.-'\ ||  |\ \   ` ;  ;       | |
 *    \-_   `;;._   ( `  /  /_       | |
 *     `-.-.// ,'`-._\__/_,'         ; |
 *        \:: :     /     `     ,   /  |
 *         || |    (        ,' /   /   |
 *         ||                ,'   / SSt|
 *
 * Gandalf has been developped by Snapp
 */
@Injectable()
export class GandalfInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const timestampsRequest = moment().format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
    request = request.clone({
      headers: request.headers
        .set('x-api-access-token', getApiAccesToken(request, timestampsRequest))
        .set('x-api-id', environment.gandalfApiId)
        .set('x-api-timestamp', timestampsRequest)
    });

    return next.handle(request);
  }
}
