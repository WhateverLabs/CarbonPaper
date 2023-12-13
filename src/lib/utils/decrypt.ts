import _sodium from 'libsodium-wrappers-sumo';

export const decryptCiphertext = (key: Uint8Array, headerB64: string, ciphertextB64: string) => {
	const headerUint8Array = _sodium.from_base64(headerB64);
	const state = _sodium.crypto_secretstream_xchacha20poly1305_init_pull(headerUint8Array, key);

	const ciphertextUint8Array = _sodium.from_base64(ciphertextB64);

	const decryptedUint8Array = _sodium.crypto_secretstream_xchacha20poly1305_pull(
		state,
		ciphertextUint8Array
	);

	return decryptedUint8Array.message;
};
