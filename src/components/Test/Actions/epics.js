import 'rxjs';
import { combineEpics } from 'redux-observable';
import { FETCH_USER, FETCH_USER_DATA } from './actionTypes';
import { getDataSuccess, getUserFailed,getUserDetails } from './actions';
import { ajax } from 'rxjs/ajax';
import { Observable , interval } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

export const fetchUser = (action$) => {
    return action$
        .ofType(FETCH_USER).pipe(
            switchMap(() => {
                return ajax.getJSON('https://jsonplaceholder.typicode.com/posts').pipe(
                    map(user => getDataSuccess(user)),
                    catchError(error => Observable.of(getUserFailed()))
                )
            }));
}

export const fetchUserComments = (action$) => {
    return action$
        .ofType(FETCH_USER_DATA).pipe(
            switchMap(() => {
                return ajax.getJSON('https://jsonplaceholder.typicode.com/posts/1/comments').pipe(
                    map(user => getUserDetails(user)),
                    catchError(error => Observable.of(getUserFailed()))
                )
            })
        );
}


export default combineEpics(
    fetchUser,
    fetchUserComments
);