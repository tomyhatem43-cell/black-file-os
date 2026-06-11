{ pkgs }: {
  deps = [
    pkgs.ffmpeg
    pkgs.python3
    pkgs.python3Packages.pip
    pkgs.bash
    pkgs.git
    pkgs.coreutils
  ];
  
  shellHook = ''
    echo "V6 CORE Replit Environment Ready"
    echo "FFmpeg and Python available for cinematic pipeline"
  '';
}