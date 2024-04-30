import os
import subprocess
lst=os.listdir()


if __name__=="__main__":
    for file in lst:
        if file.endswith(".py"):
            subprocess.getoutput(f"python3 {file}")



