export const uint8ArrayToB64String = (u8a: Uint8Array) => {
	return arrayBufferToBase64(u8a.buffer);
};

const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
	var binary = '';
	var bytes = new Uint8Array(buffer);
	var len = bytes.byteLength;
	for (var i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return window.btoa(binary);
};
