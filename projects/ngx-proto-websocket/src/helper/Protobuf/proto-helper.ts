import * as protobuf from 'protobufjs';

export class ProtoHelper {

  public static encode(
    fileName: string,
    packageName: string,
    className: string,
    payload: object
  ): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      const call = (error: Error | null, root?: protobuf.Root) => {
        if (error) throw error;

        const awesomeMessage = root?.lookupType(`${packageName}.${className}`);

        const errMsg = awesomeMessage?.verify(payload);
        if (errMsg) throw Error(errMsg);

        const message = awesomeMessage?.fromObject(payload)!;

        const result = awesomeMessage?.encode(message).finish();
        console.log(result?.toString())
        if (result) {
          resolve(result);
        } else {
          reject('error');
        }
      };

      protobuf.load(`${fileName}`, call);
    });
  }

  public static decode<T>(
    fileName: string,
    packageName: string,
    className: string,
    bytes: Uint8Array
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      protobuf.load(
        `${fileName}`,
        (error: Error | null, root?: protobuf.Root) => {
          if (error) throw error;

          const awesomeMessage = root?.lookupType(
            `${packageName}.${className}`
          );
          const result = awesomeMessage?.decode(bytes);
          if (result) {
            resolve(result as T);
          } else {
            reject('error');
          }
        }
      );
    });
  }

  public static fromHexString(hexString: string): Uint8Array {
    hexString = hexString.replace(/^0x/, '');

    if (hexString.length % 2 != 0) {
      return new Uint8Array();
    }

    const bad = hexString.match(/[G-Z\s]/i);
    if (bad) {
      return new Uint8Array();
    }

    const pairs = hexString.match(/[\dA-F]{2}/gi);

    if (!pairs) {
      return new Uint8Array();
    }
    const integers = pairs.map(function (s) {
      return parseInt(s, 16);
    });

    const array = new Uint8Array(integers);

    return array;
  }

  public static toHexString(buffer: Uint8Array) {
    return [...new Uint8Array(buffer)]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('');
  }
}
