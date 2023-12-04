with import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/23.05.tar.gz") {};

stdenv.mkDerivation {
  name = "decaf-react";

  buildInputs = with pkgs; [
    git
    nodejs # always LTS

    figlet
    lolcat
  ];

  shellHook = ''
    ## Greet:
    figlet -w 999 -f standard "DECAF REACT DEV SHELL" | lolcat -S 179
  '';
}
