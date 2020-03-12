package com.fgmmdev;

import android.app.Application;

import com.facebook.react.ReactApplication;
import cn.jystudio.bluetooth.RNBluetoothEscposPrinterPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.chirag.RNMail.RNMail;
import com.reactcommunity.rnlocalize.RNLocalizePackage;
import com.oblador.keychain.KeychainPackage;
import com.imagepicker.ImagePickerPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.rnfs.RNFSPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.vinzscam.reactnativefileviewer.RNFileViewerPackage;
import com.github.wumke.RNExitApp.RNExitAppPackage;
import io.github.elyx0.reactnativedocumentpicker.DocumentPickerPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNBluetoothEscposPrinterPackage(),
            new RNFetchBlobPackage(),
            new VectorIconsPackage(),
            new ReactNativeRestartPackage(),
            new ReanimatedPackage(),
            new RNMail(),
            new RNLocalizePackage(),
            new KeychainPackage(),
            new ImagePickerPackage(),
            new RNI18nPackage(),
            new RNGestureHandlerPackage(),
            new RNFSPackage(),
            new RNFirebasePackage(),
            new RNFileViewerPackage(),
            new RNExitAppPackage(),
            new DocumentPickerPackage(),
            new ReactNativeConfigPackage(),
            new NetInfoPackage(),
            new AsyncStoragePackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
