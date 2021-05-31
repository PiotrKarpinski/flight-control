# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
#

UserRole.create([{ name: 'admin'}, { name: 'user'}])
admin_role_id = UserRole.find_by_name('admin').id
User.create({
              first_name: 'Admin',
              last_name: 'Adminowski',
              email: 'admin@admin.com',
              password: 'admin123',
              user_role_id: admin_role_id
            })
