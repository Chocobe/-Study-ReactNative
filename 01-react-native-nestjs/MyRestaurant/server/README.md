## Matzip Server

> Inflearn, Kyo

## PostgreSQL 사용 방법

```bash
# PostgreSQL 설치 (14버전)
$ brew install postgresql@14

# 실행 (background 로 실행됨)
$ brew services start postgresql@14

# 종료 (background 에서 종료됨)
$ brew services stop postgresql@14
```

<br />

## PostgreSQL 실습용 서버

* Name: `my-restaurant-app`
* Host name: `localhost`
* Port: `5432`
* Maintenance database: `postgres`
* Username: `young-woo`
* Poassword: `postgres`

<br />

## PostgreSQL 실습용 Database

* Database: `my-restaurant-app-db`



<br /><hr /><br />



## 실행

1. 의존성 모듈 설치

프로젝트 위치에서 명령어를 실행합니다.

```
npm install
```

2. 환경 변수 설정

`[YOUR_USERNAME]` 부분 추가하여 `.env` 파일을 server 폴더 루트에 추가해주세요.

```
PORT=3030
DB_USERNAME=[YOUR_USERNAME]
DB_PASSWORD=postgres
DB_DATABASE=matzip-app
DB_HOST=localhost
JWT_SECRET=SecretMatzip
JWT_ACCESS_TOKEN_EXPIRATION=30m
JWT_REFRESH_TOKEN_EXPIRATION=30d
```

3. 개발 환경 실행

```
npm run start:dev
```

<br>

# Domain

```ts
type MarkerColor = 'RED' | 'YELLOW' | 'GREEN' | 'BLUE' | 'PURPLE';

type Category = {
  [key in MarkerColor]: string;
};

interface ImageUri {
  id?: number;
  uri: string;
}

interface Marker {
  id: number;
  latitude: number;
  longitude: number;
  color: MarkerColor;
  score: number;
}

interface Post extends Marker {
  title: string;
  address: string;
  date: Date | string;
  description: string;
}

interface Profile {
  id: number;
  email: string;
  nickname: string | null;
  imageUri: string | null;
  kakaoImageUri: string | null;
  loginType: 'email' | 'kakao' | 'apple';
}
```

# API

## Auth

#### POST /auth/signup

- requestBody

```
{
    email: string
    password: string
}
```

#### POST /auth/signin

- requestBody

```js
{
  email: string;
  password: string;
}
```

- responseBody

```js
{
  accessToken: string;
  refreshToken: string;
}
```

#### GET /auth/refresh

- header

```js
Authorization: `Bearer ${refreshToken}`;
```

- responseBody

```js
{
  accessToken: string;
  refreshToken: string;
}
```

#### GET /auth/me (getProfile)

- responseBody

```ts
type ResponseProfile = Profile & Category;
```

#### PATCH /auth/me (editProfile)

- requestBody

```ts
type RequestProfile = Omit<
  Profile,
  'id' | 'email' | 'kakaoImageUri' | 'loginType'
>;
```

- responseBody

```ts
type ResponseProfile = Profile & Category;
```

#### POST /auth/logout

#### DELETE /auth/me

#### PATCH /auth/category

- requestBody

```ts
type Category
```

- responseBody

```ts
type ResponseProfile = Profile & Category;
```

#### POST /auth/oauth/kakao

- requestBody

```js
{
  token: string;
}
```

- responseBody

```js
{
  accessToken: string;
  refreshToken: string;
}
```

#### POST /auth/oauth/apple

- requestBody

```js
{
  identityToken: string;
  appId: string;
  nickname: string | null;
}
```

- responseBody

```js
{
  accessToken: string;
  refreshToken: string;
}
```

<br>

## Marker & Post

#### GET /markers/my

- responseBody

```ts
Marker[]
```

#### GET /posts/:id

- param

```ts
{
  id: number;
}
```

- requestBody

```ts
// type ResponsePost = Post & { images: ImageUri[] };

type ResponseSinglePost = ResponsePost & { isFavorite: boolean };
```

#### DELETE /posts/:id

- param

```ts
{
  id: number;
}
```

#### GET /posts/my

- query

```js
{
  page: number;
}
```

- responseBody

```js
// type ResponsePost = Post & { images: ImageUri[] };
ResponsePost[];
```

#### GET /posts/my/search

- query

```js
{
  query: string;
  page: number;
}
```

- responseBody

```js
// type ResponsePost = Post & { images: ImageUri[] };
ResponsePost[];
```

#### POST /posts

- requestBody

```ts
type RequestCreatePost = Omit<Post, 'id'> & { imageUris: ImageUri[] };
```

#### PATCH /post/:id

- param

```ts
{
  id: number;
}
```

- requestBody

```ts
type RequestUpdatePost = {
  id: number;
  body: Omit<Post, 'id' | 'longitude' | 'latitude' | 'address'> & {
    imageUris: ImageUri[];
  };
};
```

- responseBody

```ts
type ResponseSinglePost = ResponsePost & { isFavorite: boolean };
```

#### GET /posts (getCalendarPosts)

- query

```ts
{
  year: number;
  month: number;
}
```

- responseBody

```ts
// type CalendarPost = {
//   id: number;
//   title: string;
//   address: string;
// };

type ResponseCalendarPost = Record<number, CalendarPost[]>;
```

#### GET /favorites/my

- query

```ts
{
  page: number;
}
```

#### POST /favorites/:id

- param

```ts
{
  id: number;
}
```

- responseBody

```ts
{
  id: number;
}
```

<br>

## Image

#### POST /images

- requestBody : `FormData`
- responseBody : `string[]`
