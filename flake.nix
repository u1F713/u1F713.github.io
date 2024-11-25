{
  outputs =
    { self, nixpkgs }:
    let
      inherit (nixpkgs.lib) genAttrs;
      systems = [
        "x86_64-linux"
        "x86_64-darwin"
        "aarch64-linux"
        "aarch64-darwin"
      ];
      eachSystem = f: genAttrs systems (s: f { pkgs = nixpkgs.legacyPackages.${s}; });
    in
    {
      devShells = eachSystem (
        { pkgs }:
        {
          default = pkgs.mkShell {
            packages = with pkgs; [
              nodejs_latest
              pnpm
            ];
          };
        }
      );
      formatter = eachSystem ({ pkgs }: pkgs.nixfmt-rfc-style);
    };

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  };
}
