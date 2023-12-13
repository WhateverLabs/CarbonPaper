import _sodium from 'libsodium-wrappers-sumo';
export const generatePasteKey = () => {
	return _sodium.randombytes_buf(_sodium.crypto_aead_chacha20poly1305_KEYBYTES);
};
