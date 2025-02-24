def encrypt_message(message, key):
    encrypted = ""
    for char in message:
        if char.isalpha():
            # Determine the case and base ASCII value
            ascii_base = ord('A') if char.isupper() else ord('a')
            # Apply the shift
            shifted = (ord(char) - ascii_base + key) % 26
            encrypted += chr(ascii_base + shifted)
        else:
            encrypted += char
    return encrypted

def decrypt_message(message, key):
    return encrypt_message(message, -key)

def is_yes(response):
    return response.lower() in ['y', 'yes']

def hack_caesar(encrypted_message):
    while True:
        try:
            key = int(input("\nEnter your guess for the key (1-25): "))
            if not (1 <= key <= 25):
                print("Key must be between 1 and 25")
                continue
                
            decrypted = decrypt_message(encrypted_message, key)
            print(f"\nDecrypted message with key {key}: {decrypted}")
            
            if is_yes(input("Is this the correct message? (y/n): ")):
                return key
            
            if not is_yes(input("Would you like to try another key? (y/n): ")):
                return None
            
        except ValueError:
            print("Please enter a valid number")

def main():
    while True:
        print("\n=== Caesar Cipher Program ===")
        print("1. Encrypt a message")
        print("2. Hack encrypted message")
        print("3. Exit")
        
        choice = input("Enter your choice (1-3): ")
        
        if choice == '1':
            print("\n--- Encrypter ---")
            message = input("Enter the message to encrypt: ")
            while True:
                try:
                    key = int(input("Enter the key (1-25): "))
                    if 1 <= key <= 25:
                        break
                    print("Key must be between 1 and 25")
                except ValueError:
                    print("Please enter a valid number")
            
            encrypted = encrypt_message(message, key)
            print(f"\nEncrypted message: {encrypted}")
            input("\nPress Enter to continue...")
            
        elif choice == '2':
            print("\n--- Hacker ---")
            encrypted = input("Enter the encrypted message: ")
            found_key = hack_caesar(encrypted)
            if found_key is not None:
                print(f"\nSuccess! The key was: {found_key}")
                print(f"Decrypted message: {decrypt_message(encrypted, found_key)}")
            else:
                print("\nGiving up. Better luck next time!")
            input("\nPress Enter to continue...")
            
        elif choice == '3':
            print("\nGoodbye!")
            break
        else:
            print("\nInvalid choice. Please try again.")

if __name__ == "__main__":
    main()