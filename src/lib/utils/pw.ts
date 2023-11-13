import _sodium from 'libsodium-wrappers-sumo';

export const preparePassword = (password: string, _salt?: string) => {
	let salt = new Uint8Array(0);
	if (!_salt) {
		// create a salt
		salt = _sodium.randombytes_buf(_sodium.crypto_pwhash_SALTBYTES);
	} else {
		salt = _sodium.from_base64(_salt);
	}

	// derive a key from the password
	const key = _sodium.crypto_pwhash(
		_sodium.crypto_pwhash_SALTBYTES,
		password,
		salt,
		_sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
		_sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE,
		_sodium.crypto_pwhash_ALG_ARGON2ID13
	);

	return {
		salt,
		key
	};
};
