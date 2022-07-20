with import (fetchTarball https://github.com/NixOS/nixpkgs/archive/22.05.tar.gz) {};

stdenv.mkDerivation {
  name = "decaf-react";

  buildInputs = with pkgs; [
    git
    nodejs-16_x
    yarn

    figlet
    lolcat
  ];

  shellHook = ''
    ## Greet:
    figlet -w 999 -f standard "DECAF REACT DEV SHELL" | lolcat -S 179
  '';
}
