
(:按年份查询:)
declare function local:order_by_year() as element()*
{
	for $movie in doc("All_Movies.xml")//movie
    order by $movie/@year
    return <movie name="{$movie/name}" year="{$movie/@year}" />
};

(:按评分排序:)
declare function local:order_by_rating() as element()*
{
	for $movie in doc("All_Movies.xml")//movie
    order by $movie/rating descending
    return <movie name="{$movie/name}" rating="{$movie/rating}" />
};

(:按票房排序:)
declare function local:order_by_box() as element()*
{
	for $movie in doc("All_Movies.xml")//movie
    order by xs:integer(replace($movie/Opening_Weekend_USA, ",", "")) descending
    return <movie name="{$movie/name}" box="{$movie/Opening_Weekend_USA}" />
};

(:复合条件查询：评分大于8.0的R级电影:)
declare function local:high_rating_R_movie() as element()*
{
    for $movie in doc("All_Movies.xml")//movie
    where xs:decimal($movie/rating) > xs:decimal(8.0)
           and $movie/level = "R"
    return <movie name="{$movie/name}"/>
};

(:复合条件查询：1990年代的喜剧:)
declare function local:comedy_in_1990s() as element()*
{
    for $movie in doc("All_Movies.xml")//movie
    where xs:gYear($movie/@year) < xs:gYear("2000") and xs:gYear($movie/@year) >= xs:gYear("1990")
           and exists($movie/genres/label[text()="Comedy"])
    return <movie name="{$movie/name}" year="{$movie/@year}">
                {
                    $movie/genres
                }
            </movie>
};

(:复合条件查询：票房和评分都在前五的电影:)
declare function local:high_rating_and_box() as element()*
{
    let $high_rating_movies := local:order_by_rating()
    let $high_box_movies := local:order_by_box()
    for $high_rating_movie at $movieIndex in $high_rating_movies
    where ($movieIndex < 5 and index-of($high_box_movies/@name, $high_rating_movie/@name) < 5)
    return <movie name="{$high_rating_movie/@name}" 
             box="{$high_box_movies[$movieIndex]/@box}" 
             rating_no="{$movieIndex}" box_no="{index-of($high_box_movies/@name, $high_rating_movie/@name)}"/>
};

(:查询新增数据:)
declare function local:new_records() as element()*
{
    let $all_movie := local:order_by_year()
	for $movie in $all_movie
    where xs:gYear($movie/@year) < xs:gYear("2006") 
    return <movie name="{$movie/@name}" year="{$movie/@year}" />
};

<results>
<sorted_movies_query>
<order_by_year>
{
    local:order_by_year()
}
</order_by_year>
<order_by_rating>
{
    local:order_by_rating()
}
</order_by_rating>
<order_by_box>
{
    local:order_by_box()
}
</order_by_box>
</sorted_movies_query>

<combined_conditions_query>
<high_rating_R_movies>
{
    local:high_rating_R_movie()
}
</high_rating_R_movies>
<comedy_in_1990s>
{
    local:comedy_in_1990s()
}
</comedy_in_1990s>
<high_rating_and_box_movies>
{
    local:high_rating_and_box()
}
</high_rating_and_box_movies>
</combined_conditions_query>

<new_records>
{
    local:new_records()
}
</new_records>
</results>
