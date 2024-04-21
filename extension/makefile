COPY:=xcopy
all:
	npx rimraf build
	npx tsc
	$(COPY) index.html build
	$(COPY) public build