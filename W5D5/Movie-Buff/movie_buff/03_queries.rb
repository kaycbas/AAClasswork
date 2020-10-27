def what_was_that_one_with(those_actors)
  # Find the movies starring all `those_actors` (an array of actor names).
  # Show each movie's title and id.

  Movie
    .select(:title, :id)
    .joins(:actors)
    .where(actors: {name: those_actors})
    .group(:id)
    .having("COUNT(*) = ?", those_actors.length)

    # those_actors = ['Ben Affleck', 'Matt Damon']
end

def golden_age
  # Find the decade with the highest average movie score.
  Movie
    .select('yr / 10')
    .group('yr / 10')
    .order('AVG(score) DESC')
    .pluck('yr / 10').first * 10
end

def costars(name)
  # List the names of the actors that the named actor has ever
  # appeared with.
  # Hint: use a subquery
  movies_ids = Movie
                .joins(:actors)
                .where(actors: {name: name})
                .pluck('movies.id')

  Movie
    .joins(:actors)
    .where.not('actors.name = ?', name)
    .where('movies.id IN (?)', movies_ids)
    .pluck('DISTINCT actors.name')
end

def actor_out_of_work
  # Find the number of actors in the database who have not appeared in a movie

  Actor
    .left_outer_joins(:movies)
    .where(movies: {id: nil})
    .count
end

def starring(whazzername)
  # Find the movies with an actor who had a name like `whazzername`.
  # A name is like whazzername if the actor's name contains all of the
  # letters in whazzername, ignoring case, in order.

  # ex. "Sylvester Stallone" is like "sylvester" and "lester stone" but
  # not like "stallone sylvester" or "zylvester ztallone"

  chars = '%' + whazzername.downcase.chars.join('%') + '%'

  Movie
    .joins(:actors)
    .where("LOWER(actors.name) LIKE ?", chars)
end

def longest_career
  # Find the 3 actors who had the longest careers
  # (the greatest time between first and last movie).
  # Order by actor names. Show each actor's id, name, and the length of
  # their career.
  Actor
    .select(:id, :name, 'max(movies.yr) - min(movies.yr) AS career')
    .joins(:movies)
    .group('actors.id')
    .order('career DESC')
    .limit(3)
end
