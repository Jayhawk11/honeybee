const fs = require('fs');
const path = require('path');

// All extracted photo URLs from Facebook Photos tab
const photos = [
  // Batch 1 (1-50)
  "https://scontent-hou1-1.xx.fbcdn.net/v/t39.30808-6/475114266_122159101718309264_1713004626599157823_o.jpg?stp=cp6_dst-jpg_fb50_s320x320_tt6&_nc_cat=102&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=eUm0MYGWosIQ7kNvwEn1nrS&_nc_oc=Adk3sJNO2MrWAXNV5vom3QJvCfcju0dcngsbOL86FXH2QpHXMX7NNTEieBFdb78SoTg&_nc_zt=23&_nc_ht=scontent-hou1-1.xx&_nc_gid=8xVHM1tvDpwHsfhQk-nuTA&oh=00_Afo_vM2cQMl_J9x-Ro5h4g8M7kDOJKw4OjWuKjxra9PD2g&oe=696465CB",
  "https://scontent-hou1-1.xx.fbcdn.net/v/t39.30808-6/537478704_122190198104309264_7365088899131664802_o.jpg?stp=c0.169.1536.1536a_cp6_dst-jpg_s206x206_tt6&_nc_cat=107&ccb=1-7&_nc_sid=50ad20&_nc_ohc=_HGpPCXHkCgQ7kNvwGdn311&_nc_oc=AdkB6SR6IbzRqDJ1V8giB1zxzI3_lJ9K35dq1bEmNCtSYPw4Wd38B2kfImM5zSgXtMo&_nc_zt=23&_nc_ht=scontent-hou1-1.xx&_nc_gid=RCLZLgrubTaucenuwh1-QA&oh=00_Afo0XFlDb-qO9g3znFhwU2ZbTkI_VvV49ahYdNtVIoqyeA&oe=6964856D",
  "https://scontent-hou1-1.xx.fbcdn.net/v/t39.30808-6/538444170_122190197804309264_5790394524283914482_o.jpg?stp=c0.169.1536.1536a_cp6_dst-jpg_s206x206_tt6&_nc_cat=105&ccb=1-7&_nc_sid=50ad20&_nc_ohc=69rfMIibu8EQ7kNvwG1SVQF&_nc_oc=AdloEoercI_WOJou8wRMpz8oi0yfp4AhiajWrv9EFAEhw6A00PqNidll4kwQ87s6yfM&_nc_zt=23&_nc_ht=scontent-hou1-1.xx&_nc_gid=RCLZLgrubTaucenuwh1-QA&oh=00_AfoasB6dD34kWZkbjTQrk9I0jI_XtQen7xgtJ5C1CBeSBw&oe=69647EFF",
  "https://scontent-hou1-1.xx.fbcdn.net/v/t39.30808-6/538145463_122190198740309264_5404411593180383376_o.jpg?stp=c0.169.1536.1536a_cp6_dst-jpg_s206x206_tt6&_nc_cat=102&ccb=1-7&_nc_sid=50ad20&_nc_ohc=yQ8XNoalbT4Q7kNvwGA9SA1&_nc_oc=AdnU8fcNpUPAjx6E90HGRZodQ-XDyKxbbij-DlmHmO0O1_lfpBgLpSrjuvgMOmiTyls&_nc_zt=23&_nc_ht=scontent-hou1-1.xx&_nc_gid=RCLZLgrubTaucenuwh1-QA&oh=00_AfoaFiEZ1PsESD79H1VNsm718Eyc3lNZcRCChHg-ryr_MA&oe=69646F19",
  "https://scontent-hou1-1.xx.fbcdn.net/v/t39.30808-6/535943370_122190198590309264_4377000738883807504_o.jpg?stp=c529.0.990.990a_cp6_dst-jpg_s206x206_tt6&_nc_cat=102&ccb=1-7&_nc_sid=50ad20&_nc_ohc=FI4yG_kBD8cQ7kNvwGeq85b&_nc_oc=AdnzZir8f33nfwzKex50qWHIO7DoIM8kg4EPFOorbzRb9kP77lOwkcIWrYQN8aybN1o&_nc_zt=23&_nc_ht=scontent-hou1-1.xx&_nc_gid=RCLZLgrubTaucenuwh1-QA&oh=00_AfosVUAo3SZ_hBVxz-5qfqOu6t-HWp-01beEyBtgtXLZFQ&oe=6964984B",
  "https://scontent-hou1-1.xx.fbcdn.net/v/t39.30808-6/537100194_122190199100309264_3037077654297148443_o.jpg?stp=c0.100.1746.1746a_cp6_dst-jpg_s206x206_tt6&_nc_cat=109&ccb=1-7&_nc_sid=50ad20&_nc_ohc=G453DQvIjK4Q7kNvwHIWekH&_nc_oc=AdkdNxERpIhuXXAyU5AYW1zVK8rMVU_b1aM2y1uzC8_iDKrGNkv0ytk6fmr2RPaIPW0&_nc_zt=23&_nc_ht=scontent-hou1-1.xx&_nc_gid=RCLZLgrubTaucenuwh1-QA&oh=00_AfozBDEyRUKy7H32rC0FehvaUd6hho-6q47P6wJZFP83mw&oe=6964737C",
  "https://scontent-hou1-1.xx.fbcdn.net/v/t39.30808-6/536981359_122190197558309264_3942341498466317238_o.jpg?stp=c0.169.1536.1536a_cp6_dst-jpg_s206x206_tt6&_nc_cat=110&ccb=1-7&_nc_sid=50ad20&_nc_ohc=IiKTuM4bI0kQ7kNvwH79_Fr&_nc_oc=AdkNM-E3-qXZH3OsibtVZUPq3PbXF4PrfScXBDP1JCiDmkXEtrncaMTvbFIIP-Wuvcw&_nc_zt=23&_nc_ht=scontent-hou1-1.xx&_nc_gid=RCLZLgrubTaucenuwh1-QA&oh=00_Afr_dJ9gNc5xGZKY2IsNeHNI93RsPxmLTkFBmr5NFUvvHQ&oe=6964841E",
  "https://scontent-hou1-1.xx.fbcdn.net/v/t39.30808-6/536553875_122190198230309264_8125634765710011456_o.jpg?stp=c0.169.1536.1536a_cp6_dst-jpg_s206x206_tt6&_nc_cat=100&ccb=1-7&_nc_sid=50ad20&_nc_ohc=8T8lWd8WaEEQ7kNvwGumc7D&_nc_oc=AdlYhvDUpNL6AIhdgTXiXYS1oaiRptnKXk8LV3sSv_yXkRUwcwMK9b7qMrRS1a44ASE&_nc_zt=23&_nc_ht=scontent-hou1-1.xx&_nc_gid=io2PeSMLTZEFYkeQgZx5WQ&oh=00_Afrxr3ZaPIXlETgMaC80Q2hS7kt0zpv2szS1SLrBw-z6rA&oe=696488DA",
  "https://scontent-hou1-1.xx.fbcdn.net/v/t39.30808-6/538252836_122190197636309264_4230801315076147509_o.jpg?stp=c0.169.1536.1536a_cp6_dst-jpg_s206x206_tt6&_nc_cat=104&ccb=1-7&_nc_sid=50ad20&_nc_ohc=c5PsT-nJVv4Q7kNvwFrgVW-&_nc_oc=AdmtsU_Folcipii0otppmYktuolGYtkK23ilSIhldGdcPmeaTnSvHIlyDBfSmY-EZYY&_nc_zt=23&_nc_ht=scontent-hou1-1.xx&_nc_gid=io2PeSMLTZEFYkeQgZx5WQ&oh=00_AfpGBZ8yTWAUGkzihoq086Q3_k742-mibEHDsYUcihokNw&oe=69649973",
  "https://scontent-hou1-1.xx.fbcdn.net/v/t39.30808-6/538593245_122190198548309264_4893633650909697697_o.jpg?stp=c0.169.1536.1536a_cp6_dst-jpg_s206x206_tt6&_nc_cat=109&ccb=1-7&_nc_sid=50ad20&_nc_ohc=nFidZ7S78e8Q7kNvwHHb7Ei&_nc_oc=AdkxNnt1SiP8rxTNyP43c83nlN6RSoZTpiYWJnnRRI8gcT5zHTESEUn8onqE3MQQ-kg&_nc_zt=23&_nc_ht=scontent-hou1-1.xx&_nc_gid=io2PeSMLTZEFYkeQgZx5WQ&oh=00_AfrVSBE2-ejjT88g2ji2EWmsrOfmVzhvICl3lEUBn_eqig&oe=696468C2"
];

// Process photos into manifest format
const photoManifest = {
  extractedAt: new Date().toISOString(),
  source: "https://www.facebook.com/profile.php?id=61559277947065&sk=photos",
  totalPhotos: 115,
  note: "Photos were extracted from Facebook CDN. Direct downloads fail with 403 Forbidden. Use fullResolutionUrl field for hotlinking or manual download through logged-in browser.",
  photos: photos.map((url, index) => ({
    id: index + 1,
    filename: `photo-${String(index + 1).padStart(3, '0')}.jpg`,
    fullResolutionUrl: url,
    downloaded: false,
    downloadedAt: null
  }))
};

const outputPath = path.join(__dirname, '../public/data/photos-manifest.json');
fs.writeFileSync(outputPath, JSON.stringify(photoManifest, null, 2));
console.log(`Created photo manifest with ${photos.length} photos`);
console.log(`Output: ${outputPath}`);
