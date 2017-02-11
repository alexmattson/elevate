class Poll < ApplicationRecord
    def initialize(name, description, type)
        self.name = name
        self.description = description
        self.type = type
        self.token = SecureRandom.urlsafe_base64(6)
    end
end
