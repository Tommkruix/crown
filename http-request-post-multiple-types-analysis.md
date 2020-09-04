# Analysis

1. Sends all data in a single "data" section as different attachments(Ample hints for each part about the content type )

   `curl -H 'Content-Type:multipart/mixed' -F 'doc={"a":"b", "c":"d"};type=application/json' -F 'file1=@examples.desktop' -F 'file2=@examples.desktop' httpbin.org/post`

2. Sends 2 data files as 2 key-value pairs in "files" section and JSON as is in "form" section (No hint in request formed that the type is JSON and file is "file")

   `curl -F 'doc={"a":"b", "c":"d"};type=application/json' -F 'file1=@examples.desktop' -F 'file2=@examples.desktop' httpbin.org/post`

3. Sends just JSON in "form" section (No hint in request formed that the type is JSON)

   `curl -F 'doc={"a":"b", "c":"d"};type=application/json' httpbin.org/post`

4. Sends just JSON in "data" section

   `curl -H 'Content-Type:application/json' -d '{"a":"b", "c":"d"}' httpbin.org/post`
