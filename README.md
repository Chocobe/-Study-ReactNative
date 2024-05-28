# React Native 스터디

* React Native 스터디 저장소입니다.



<br /><hr /><br />



## React Native 프로젝트 생성하기

React Native 공식문서를 참고하여 개발환경을 구성합니다.

* [Set up Your Environment](https://reactnative.dev/docs/set-up-your-environment)

<br />

React Native 는 `Expo` 와 같은 프레임워크를 사용하여 프로젝트를 구성할 수 있지만, React Native CLI 를 사용하여 기본 수준부터 스터디를 하고자 합니다.

프레임워크 없이 React Native 프로젝트를 생성하기 위해서는 `React Native Community CLI` 를 사용합니다.

* [Get Started Without a Framework](https://reactnative.dev/docs/getting-started-without-a-framework)

프로젝트를 생성하고자 하는 경로에서 아래의 명령을 실행합니다.

```base
$ npx @react-native-community/cli@latest init AwesomeProject
```



<br /><hr /><br />



## 개발환경에서 실행하기

React Native 는 iOS 와 Android 환경 모두 사용할 수 있습니다.

* iOS 를 위한 환경: `Xcode`
* Android 를 위한 환경: `Android Studio`

<br />

### iOS 환경에서 실행하기

프로젝트를 최초 생성했다면, `cocoapods` 에서 제공하는 CLI 를 사용하여 install 과정이 필요합니다.

1. 터미널의 위치를 `프로젝트의 ios` 경로로 이동합니다.
2. `ios` 경로에는 `Podfile` 이 있으며, pod CLI 를 사용하여 Install 과정을 수행할 수 있습니다.

```base
$ pod install
```

<br />

`pod install` 을 완료했다면, 터미널의 경로를 프로젝트 루트로 이동한 후, 아래의 명령으로 iOS 개발환경에서 프로젝트를 실행합니다.

```bash
$ yarn start
```

실행 환경 선택지가 나타나며 `i` 를 입력하여 `iOS` 환경에서 프로젝트를 실행합니다.



<br />



### Android 환경에서 실행하기

1. Android 환경에서 실행하기 위해서는 `Android Studio` 를 먼저 실행해야 합니다.
2. 그리고 `Android Studio` 의 `More Actions` 를 통해서 `Vertual Device Manager` 를 실행합니다.
3. VDM 목록에서 사용할 Vertual Manager 의 `start` 버튼을 클릭합니다.

<br />

Android Studio 의 VM 이 정상적으로 실행된다면, 모바일 화면이 나타납니다.

모바일 화면이 나타난 후, 터미널에서 프로젝트 루트 경로로 이동하여 아래의 명령으로 프로젝트를 실행할 수 있습니다.

```bash
$ yarn start
```

실행 환경 선택지가 나타나면 `a` 를 입력하여 `Android` 환경에서 프로젝트를 실행합니다.
