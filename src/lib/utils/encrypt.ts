import _sodium from 'libsodium-wrappers-sumo';
export const encryptPayload = (key: Uint8Array, data: ArrayBuffer) => {
	const state = _sodium.crypto_secretstream_xchacha20poly1305_init_push(key);

	const ciphertext = _sodium.crypto_secretstream_xchacha20poly1305_push(
		state.state,
		new Uint8Array(data),
		null,
		_sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL
	);

	return {
		header: state.header,
		ciphertext
	};
};
