with import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/24.05.tar.gz") { };

stdenv.mkDerivation {
  name = "decaf-react";

  buildInputs = with pkgs; [
    nodejs_18

    figlet
    lolcat
  ];

  shellHook = ''
    ## Greet:
    figlet -w 999 -f standard "DECAF REACT DEV SHELL" | lolcat -S 179
  '';
}
