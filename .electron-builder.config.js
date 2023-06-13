/**
 * @type {() => import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configurtagation
 */
module.exports = async function () {
  return {
    productName: 'Rebrowser',
    appId: 'com.nicolaslopezj.rebrowser',
    afterSign: 'electron-builder-notarize',
    directories: {
      output: 'dist',
      buildResources: 'assets',
    },
    publish: {
      provider: 'github',
      publishAutoUpdate: true,
    },
    mac: {
      hardenedRuntime: true,
      electronLanguages: ['en'],
      icon: 'assets/icon.icns',
      entitlements:
        './node_modules/electron-builder-notarize/entitlements.mac.inherit.plist',
      publish: ['github'],
      target: [
        {
          target: 'dmg',
          arch: ['arm64', 'x64'],
        },
        {
          target: 'zip',
          arch: ['arm64', 'x64'],
        },
      ],
    },
    win: {
      publish: ['github'],
      icon: 'assets/icon.ico',
      target: [
        {
          target: 'nsis',
          arch: ['x64', 'ia32'],
        },
      ],
    },
    nsis: {
      oneClick: true,
      perMachine: true,
    },
    dmg: {
      icon: 'assets/icon.icns',
      internetEnabled: true,
    },
  }
}
