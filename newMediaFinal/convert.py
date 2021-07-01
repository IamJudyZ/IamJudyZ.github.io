out = open("dcDIV.txt","a")

with open('dc.txt', 'r') as f:
    curr = ""
    for line in f:
        # curr = "<div>" + line + "</div>\n"
        line = line.rstrip()
        line = line.replace('"', '\\"')
        curr = "<div>"
        curr = curr + line
        curr = curr + "</div>"
        out.write(curr)
        curr = ""