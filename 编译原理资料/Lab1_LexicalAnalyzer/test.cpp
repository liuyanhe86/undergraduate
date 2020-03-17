int i = 0;
char c = 'a';
char *lowercase = "                          ";
char *uppercase = "                          ";
while(i<51)
{
	char temp = c + i;
	if (i<26)
		lowercase[i] = temp;
	else
		uppercase[i - 26] = temp;
}