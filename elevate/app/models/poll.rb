class Poll < ApplicationRecord

  def self.generate_token
    return SecureRandom.urlsafe_base64(5)
  end

end
