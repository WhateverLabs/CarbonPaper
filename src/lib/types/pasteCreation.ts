export interface PasteRequestBody {
	senderNameHeader: string;
	senderNameCiphertext: string;

	bodyHeader: string;
	bodyCiphertext: string;

	kekHash?: string;
	passwordHashSalt?: string;
	encryptedKeyHeader?: string;

	expiresInSeconds: number;
}
