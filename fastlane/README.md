fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

### build_release

```sh
[bundle exec] fastlane build_release
```



### increment_android_version

```sh
[bundle exec] fastlane increment_android_version
```



### upload_to_appcenter

```sh
[bundle exec] fastlane upload_to_appcenter
```



### notify_testers

```sh
[bundle exec] fastlane notify_testers
```



----


## iOS

### ios testflight_build

```sh
[bundle exec] fastlane ios testflight_build
```

IOS build IPA then upload to TestFlight

----


## Android

### android appcenter_build

```sh
[bundle exec] fastlane android appcenter_build
```

Android build apk

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
