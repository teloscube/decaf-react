with import
  (fetchTarball
    "https://github.com/NixOS/nixpkgs/archive/release-24.11.tar.gz")
{ };

stdenv.mkDerivation {
  name = "decaf-react";

  buildInputs = with pkgs; [
    nodejs_20

    figlet
    lolcat
  ];

  shellHook = ''
    ## Greet:
    figlet -w 999 -f standard "DECAF REACT DEV SHELL" | lolcat -S 179
  '';
}
