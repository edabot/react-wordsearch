#set($inputRoot = $input.path('$'))
{
"gridId" : "$inputRoot.gridId",
"grid" : [#foreach($elem in $inputRoot.grid)
    {
      "S": "$elem"
    }#if($foreach.hasNext),#end
#end],
"rows" : "$inputRoot.rows",
"wordPositions" : {
	#foreach($word in $inputRoot.wordPositions.keySet())
    #set($positions = $inputRoot.wordPositions.$word)
    "$word" : [#foreach($position in $positions)
        {
            "N": $position
        }#if($foreach.hasNext),#end
    ]
      #if($foreach.hasNext),#end
      #end
    }
}
