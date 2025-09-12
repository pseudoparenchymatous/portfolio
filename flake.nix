{
  description = "My Portfolio";

  inputs.nixpkgs.url = "nixpkgs/nixos-unstable";

  nixConfig = {
    extra-substituters = [
      "https://cache.nixos.org"
      "https://nix-community.cachix.org"
    ];
    extra-trusted-public-keys = [
      "nix-community.cachix.org-1:mB9FSh9qf2dCimDSUo8Zy7bkq5CX+/rkCWyvRCYg3Fs="
      "cache.nixos.org-1:6NCHdD59X431o0gWypbMrAURkbJ16ZPMQFGspcDShjY="
    ];
  };

  outputs = { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
    in {
      devShells.${system}.default = pkgs.mkShell {
        name = "portfolio-devshell";

        nativeBuildInputs = with pkgs; [
          # TOOLS
          nodejs_24
          pnpm
          biome
        ];

        shellHook = ''
        echo "Developing My Portfolio";
        '';

        # Environment variables
      };
    };
}

