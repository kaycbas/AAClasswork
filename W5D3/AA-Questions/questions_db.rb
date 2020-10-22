require 'sqlite3'
require 'singleton'

class QuestionDBConnection < SQLite3::Database
    include Singleton
    
    def initialize
        super('questions.db')
        self.type_translation = true
        self.results_as_hash = true
    end
end

class User
    attr_accessor :id, :fname, :lname

    def self.find_by_id(id)
        data = QuestionDBConnection.instance.execute(<<-SQL, id)
            SELECT
                *
            FROM
                users
            WHERE
                id = ?
        SQL
        # data.map { |options| User.new(options) }
        User.new(data.first) if data.length >  0
    end

    def self.find_by_name(fname, lname)
        data = QuestionDBConnection.instance.execute(<<-SQL, fname, lname)
            SELECT
                *
            FROM
                users
            WHERE
                fname = ? AND lname = ?
        SQL
        User.new(data.first) if data.length >  0
    end
    
    def initialize(options)
        @id = options['id']
        @fname = options['fname']
        @lname = options['lname']
    end

    def authored_questions
        Question.find_by_author_id(self.id)
    end

    def authored_replies
        Reply.find_by_user_id(self.id)
    end

    def followed_questions
        QuestionFollow.followed_questions_for_user_id(self.id)
    end

    def liked_questions
        QuestionLike.liked_questions_for_user_id(self.id)
    end
end

class Question

    attr_accessor :id, :title, :body, :associated_author_id

    def self.find_by_id(id)
        data = QuestionDBConnection.instance.execute(<<-SQL, id)
            SELECT
                *
            FROM
                questions
            WHERE
                id = ?
        SQL
        Question.new(data.first) if data.length >  0
    end
    
    def self.find_by_author_id(author_id)
        data = QuestionDBConnection.instance.execute(<<-SQL, author_id)
            SELECT
                *
            FROM
                questions
            WHERE
                associated_author_id = ?
        SQL
        data.map { |options| Question.new(options) }
        # Question.new(data.first) if data.length >  0
    end

    def self.most_followed(n)
        QuestionFollow.most_followed_questions(n)
    end

    def self.most_liked(n)
        QuestionLike.most_liked_questions(n)
    end
    
    def initialize(options)
        @id = options['id']
        @title = options['title']
        @body = options['body']
        @associated_author_id = options['associated_author_id']
    end

    def author
        User.find_by_id(self.associated_author_id)
    end

    def replies
        Reply.find_by_question_id(self.id)
    end

    def followers
        QuestionFollow.followers_for_question_id(self.id)
    end

    def likers
        QuestionLike.likers_for_question_id(self.id)
    end

    def num_likes
        QuestionLike.num_likes_for_question_id(self.id)
    end
end


class QuestionFollow

    def self.find_by_id(id)
        data = QuestionDBConnection.instance.execute(<<-SQL, id)
            SELECT
                *
            FROM
                question_follows
            WHERE
                id = ?
        SQL
        QuestionFollow.new(data.first) if data.length >  0
    end

    def self.followers_for_question_id(question_id)
        data = QuestionDBConnection.instance.execute(<<-SQL, question_id)
            SELECT
                users.fname, users.lname
            FROM
                question_follows
            JOIN
                users ON question_follows.user_id = users.id
            WHERE
                question_id = ?
        SQL
        data.map { |options| User.new(options) }
    end

    def self.followed_questions_for_user_id(user_id)
        data = QuestionDBConnection.instance.execute(<<-SQL, user_id)
            SELECT
                questions.*
            FROM
                question_follows
            JOIN
                questions ON question_follows.question_id = questions.id
            WHERE
                user_id = ?
        SQL
        data.map { |options| Question.new(options) }
    end

    def self.most_followed_questions(n)
        data = QuestionDBConnection.instance.execute(<<-SQL, n)
            SELECT
                DISTINCT questions.*
            FROM
                question_follows
            JOIN
                questions ON question_follows.question_id = questions.id
            WHERE
                question_follows.question_id IN (
                    SELECT
                        question_id
                    FROM
                        question_follows
                    GROUP BY
                        question_id
                    ORDER BY
                        COUNT(user_id) DESC
                    LIMIT
                        ?
                )
        SQL
        data.map { |options| Question.new(options) }
    end

    attr_accessor :id, :user_id, :question_id
    
    def initialize(options)
        @id = options['id']
        @user_id = options['user_id']
        @question_id = options['question_id']
    end

    

end

class Reply
    attr_accessor :id, :subject_question_id, :parent_reply_id, :user_id, :body

    def self.find_by_id(id)
        data = QuestionDBConnection.instance.execute(<<-SQL, id)
            SELECT
                *
            FROM
                replies
            WHERE
                id = ?
        SQL
        Reply.new(data.first) if data.length >  0
    end

    def self.find_by_user_id(user_id)
        data = QuestionDBConnection.instance.execute(<<-SQL, user_id)
            SELECT
                *
            FROM
                replies
            WHERE
                user_id = ?
        SQL
        data.map { |options| Reply.new(options) }
        # Reply.new(data.first) if data.length >  0
    end
    
    def self.find_by_question_id(question_id)
        data = QuestionDBConnection.instance.execute(<<-SQL, question_id)
            SELECT
                *
            FROM
                replies
            WHERE
                subject_question_id = ?
        SQL
        data.map { |options| Reply.new(options) }
    end
    
    def initialize(options)
        @id = options['id']
        @subject_question_id = options['subject_question_id']
        @parent_reply_id = options['parent_reply_id']
        @user_id = options['user_id']
        @body = options['body']
    end

    def author
        User.find_by_id(self.user_id)
    end

    def question
        Question.find_by_id(self.subject_question_id)
    end

    def parent_reply
        Reply.find_by_id(self.parent_reply_id)
    end

    def child_replies
        data = QuestionDBConnection.instance.execute(<<-SQL, self.id)
            SELECT
                *
            FROM
                replies
            WHERE
                parent_reply_id = ?
        SQL
        data.map { |options| Reply.new(options) }
    end

end

class QuestionLike

    def self.find_by_id(id)
        data = QuestionDBConnection.instance.execute(<<-SQL, id)
            SELECT
                *
            FROM
                question_likes
            WHERE
                id = ?
        SQL
        QuestionLike.new(data.first) if data.length >  0
    end

    def self.likers_for_question_id(question_id)
        data = QuestionDBConnection.instance.execute(<<-SQL, question_id)
            SELECT
                users.*
            FROM
                question_likes
            JOIN
                users ON question_likes.user_id = users.id
            WHERE
                question_likes.question_id = ?
        SQL
        data.map { |options| User.new(options) } 
    end

    def self.num_likes_for_question_id(question_id)
        data = QuestionDBConnection.instance.execute(<<-SQL, question_id)
            SELECT
                COUNT(*) AS counter
            FROM
                question_likes
            JOIN
                users ON question_likes.user_id = users.id
            WHERE
                question_likes.question_id = ?
        SQL
        data.first['counter']
    end

    def self.liked_questions_for_user_id(user_id)
        data = QuestionDBConnection.instance.execute(<<-SQL, user_id)
            SELECT
                questions.*
            FROM
                question_likes
            JOIN
                questions ON question_likes.question_id = questions.id
            WHERE
                question_likes.user_id = ?
        SQL
        data.map { |options| Question.new(options) }
    end

    def self.most_liked_questions(n)
        data = QuestionDBConnection.instance.execute(<<-SQL, n)
            SELECT
                DISTINCT questions.*
            FROM
                question_likes
            JOIN
                questions ON question_likes.question_id = questions.id
            WHERE
                question_likes.question_id IN (
                    SELECT
                        question_id
                    FROM
                        question_likes
                    GROUP BY
                        question_id
                    ORDER BY
                        COUNT(user_id) DESC
                    LIMIT
                        ?
                )
        SQL
        data.map { |options| Question.new(options) }

        # question_ids = QuestionDBConnection.instance.execute(<<-SQL) SELECT id FROM questions SQL
        # arr = question_ids.map { |ele| QuestionLike.num_likes_for_question_id(ele['id']) }
        # arr.sort.reverse.take(n).map { |ele| Question.new(Question.find_by_id(ele)) }
    end

    attr_accessor :id, :user_id, :question_id
    
    def initialize(options)
        @id = options['id']
        @user_id = options['user_id']
        @question_id = options['question_id']
    end

end