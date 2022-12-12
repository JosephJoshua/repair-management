export enum OS {
  unknown,
  windows,
  macos,
  linux,
  android,
  ios,
}

const getOS = (userAgent: string): OS => {
  const windowsPlatforms = /(win32|win64|windows|wince)/i;
  const macosPlatforms = /(macintosh|macintel|macppc|mac68k|macos)/i;
  const linuxPlatforms = /linux/i;
  const androidPlatforms = /android/i;
  const iosPlatforms = /(iphone|ipad|ipod)/i;

  if (macosPlatforms.test(userAgent)) return OS.macos;
  if (iosPlatforms.test(userAgent)) return OS.ios;
  if (windowsPlatforms.test(userAgent)) return OS.windows;
  if (androidPlatforms.test(userAgent)) return OS.android;
  if (linuxPlatforms.test(userAgent)) return OS.linux;

  return OS.unknown;
};

export default getOS;
