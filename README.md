# LightSync Website

Premium responsive website for the official LightSync v1.0.0 Windows desktop release.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Production build

```bash
npm run build
npm start
```

## Official v1.0.0 download configuration

All installer links use one release configuration in:

`src/config/download.ts`

The default installer path is:

`https://drive.google.com/file/d/1uCPCnIhXtO8DYErqG9ac5sNVMDDG1HOr/view?usp=sharing`

To use that fallback, place the real official installer here:

The installer is hosted externally on Google Drive and is not stored in the website repository.

The installer binary is intentionally **not** included in this website source package unless you add the real `.exe` file yourself.

For production hosting, you can instead set:

```env
NEXT_PUBLIC_LIGHTSYNC_DOWNLOAD_URL=https://your-real-official-host/LightSync-Setup-v1.0.0.exe
```

Do not use a fake URL.

### Optional SHA-256 display

If you have verified the real installer checksum, set:

```env
NEXT_PUBLIC_LIGHTSYNC_SHA256=your_real_sha256_here
```

If this variable is blank or unset, the website hides the SHA-256 field. No checksum is invented.

See `.env.example` for both settings.

## v1.0.0 website release update

- Converts the previous pre-release download area into the official LightSync v1.0.0 Windows release experience.
- Adds the release badge and Windows 10 / 11 64-bit information to the hero.
- Adds reusable download-button states: normal, hover and `Starting Download…`.
- Adds a premium Windows download card with version, platform, architecture, installer name and self-contained .NET wording.
- Adds installation and first-launch flows.
- Adds conservative System Requirements.
- Adds compact v1.0.0 release notes.
- Adds configurable download URL and optional configurable SHA-256 checksum.
- Adds the Windows security-warning note without claiming the installer is code-signed.
- Updates SEO and Open Graph metadata for the public Windows release.
- Preserves the existing Smart Hardware Configurator, Power Adapter guidance, regional shopping, WLED setup, real-kick audio workflow, Producer Studio, recovery tools, FAQ, mockups and dark/light design.

## Accuracy notes

- Kick flashes react to kicks detected from the live PC audio signal. BPM/rhythm can guide animation timing, but they do not generate the real kick flash.
- Hardware recommendations remain planning guidance, not compatibility guarantees.
- LightSync is presented as an independent project and not as affiliated with WLED or LED hardware manufacturers.

## Performance testing

Next.js development mode includes hot reload and development diagnostics, so it can feel slower than the production build. Compare real performance with:

```bash
npm run build
npm run start:8000
```

For development on port 8000:

```bash
npm run dev:8000
```
