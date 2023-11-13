export interface PasteRequestBody {
	senderNameHeader: string;
	senderNameCiphertext: string;

	bodyHeader: string;
	bodyCiphertext: string;

	passwordHash?: string;
	passwordHashSalt?: string;
	encryptedKeyHeader?: string;

	expiresInSeconds: number;
}
