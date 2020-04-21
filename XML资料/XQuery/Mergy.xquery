declare function local:order_by_year() as element()*
{
	for $movie in doc("Oscars_Best_Motion_Pics-v1.8.xml")//movie | doc("1.7/Oscars_Best_Motion_Pics-v1.7.xml")//movie
    return $movie
};

<all_movies>
{
    local:order_by_year()
}
</all_movies>