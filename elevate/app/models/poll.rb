class Poll < ApplicationRecord
    def self.set_token
        SecureRandom.urlsafe_base64(6)
    end
end
