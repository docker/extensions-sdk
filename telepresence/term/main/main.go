package main

import (
	"os"
	"os/exec"
)

func main() {
	cmd := exec.Command(os.Args[1], os.Args[2:]...)
	println(cmd.Args)
	err := cmd.Run()
	if err != nil {
		println(cmd.Stderr)
	} else {
		println(cmd.Stdout)
	}
}
