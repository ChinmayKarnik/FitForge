# FitForge Play Store Release Build Setup

## Keystore Security Setup

The release keystore password is **NOT stored in git** to protect your credentials. Here's how to set it up:

### Step 1: Create `android/local.properties`

This file is already in `.gitignore` and won't be committed to git.

```bash
cp android/local.properties.example android/local.properties
```

### Step 2: Edit `android/local.properties`

Open the file and replace with your actual keystore credentials:

```properties
KEYSTORE_PASSWORD=<your-keystore-password>
KEY_ALIAS=fitforge
KEY_PASSWORD=<your-key-password>
```

### Step 3: Keep It Safe

- ✅ `local.properties` is automatically ignored and won't be committed
- ✅ Use the same password for both KEYSTORE_PASSWORD and KEY_PASSWORD
- ✅ Store the password in your password manager
- ✅ Never share this file with others

### Alternative: Environment Variables

If you prefer, you can also set environment variables instead of local.properties:

```bash
export KEYSTORE_PASSWORD="your-password"
export KEY_PASSWORD="your-password"
```

Then add to your shell profile (~/.zshrc or ~/.bash_profile):

```bash
export KEYSTORE_PASSWORD="your-password"
export KEY_PASSWORD="your-password"
```

### Step 4: Build Release APK

Once configured, build the release package:

```bash
# Build release APK
cd android && ./gradlew assembleRelease

# Or build Android App Bundle (AAB) - preferred for Play Store
cd android && ./gradlew bundleRelease
```

The APK/AAB will be in:
- APK: `android/app/build/outputs/apk/release/`
- AAB: `android/app/build/outputs/bundle/release/`

---

## Security Checklist

- [ ] Created `android/local.properties` with credentials
- [ ] Verified `local.properties` is in `.gitignore`
- [ ] Never committed `local.properties`
- [ ] Stored keystore password securely in password manager
- [ ] Never shared keystore file or password publicly

---

## Troubleshooting

**Error: "Invalid keystore format"**
- Make sure you're using the correct password

**Error: "Key alias does not exist"** 
- Key alias must be `fitforge` (case-sensitive)

**Error: "Could not find local.properties"**
- Make sure the file exists and is in the `android/` directory

