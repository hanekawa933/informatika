"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const primaryKey = () => {
      return {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      };
    };
    const notNullString = (range) => {
      return {
        allowNull: false,
        type: Sequelize.STRING(range),
      };
    };

    const nullableString = (range) => {
      return {
        allowNull: true,
        type: Sequelize.STRING(range),
      };
    };

    const notNullInteger = () => {
      return {
        allowNull: false,
        type: Sequelize.INTEGER,
      };
    };

    const nullableInteger = () => {
      return {
        allowNull: false,
        type: Sequelize.INTEGER,
      };
    };

    const notNullDate = () => {
      return {
        allowNull: false,
        type: Sequelize.DATE,
      };
    };

    const notNullText = () => {
      return {
        allowNull: false,
        type: Sequelize.TEXT,
      };
    };

    const PKCascade = () => {
      return {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
      };
    };

    const administrator = (tableName) => {
      queryInterface.createTable(tableName, {
        id: PKCascade(),
        username: notNullString(15),
        password: notNullString(255),
        nama: notNullString(35),
        createdAt: notNullDate(),
        updatedAt: notNullDate(),
      });
    };

    const penanggungJawab = (tableName) => {
      queryInterface.createTable(tableName, {
        id: PKCascade(),
        username: notNullString(15),
        password: notNullString(255),
        anggota_id: notNullInteger(),
        created_by: notNullString(35),
        updated_by: nullableString(35),
        createdAt: notNullDate(),
        updatedAt: notNullDate(),
      });
    };

    return await Promise.all([
      administrator("administrator"),

      queryInterface.createTable("divisi", {
        id: PKCascade(),
        divisi: notNullString(100),
        createdAt: notNullDate(),
        updatedAt: notNullDate(),
      }),

      penanggungJawab("admin_divisi"),

      queryInterface.createTable("agama", {
        id: PKCascade(),
        agama: notNullString(30),
        createdAt: notNullDate(),
        updatedAt: notNullDate(),
      }),

      queryInterface.createTable("anggota", {
        id: PKCascade(),
        nama_depan: notNullString(35),
        nama_belakang: notNullString(35),
        tempat: notNullString(35),
        tgl_lahir: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        agama_id: notNullInteger(),
        nim: notNullString(15),
        jabatan: notNullString(50),
        angkatan: notNullString(4),
        divisi_id: notNullInteger(),
        foto: notNullString(255),
        email: notNullString(30),
        instagram: nullableString(30),
        twitter: nullableString(30),
        facebook: nullableString(30),
        whatsapp: notNullString(30),
        created_by: nullableString(35),
        updated_by: nullableString(35),
        createdAt: notNullDate(),
        updatedAt: notNullDate(),
      }),

      queryInterface.createTable("event", {
        id: PKCascade(),
        nama: notNullString(255),
        description: notNullText(),
        harga: notNullInteger(),
        rules: notNullText(),
        poster: notNullString(255),
        lokasi: notNullString(255),
        tanggal: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        jam_mulai: {
          type: Sequelize.TIME,
          allowNull: false,
        },
        jam_berakhir: {
          type: Sequelize.TIME,
          allowNull: false,
        },
        created_by: nullableString(35),
        updated_by: nullableString(35),
        createdAt: notNullDate(),
        updatedAt: notNullDate(),
      }),

      queryInterface.createTable("pengunjung", {
        id: PKCascade(),
        nama_depan: notNullString(35),
        nama_belakang: notNullString(35),
        email: notNullString(100),
        no_telp: notNullString(20),
        validasi: {
          type: Sequelize.STRING(12),
          defaultValue: "tidak aktif",
        },
        event_id: notNullInteger(),
        createdAt: notNullDate(),
        updatedAt: notNullDate(),
      }),

      queryInterface.createTable("tamu", {
        id: primaryKey(),
        nama_tamu: notNullString(70),
        event_id: notNullInteger(),
        createdAt: notNullDate(),
        updatedAt: notNullDate(),
      }),

      queryInterface.createTable("tiket", {
        id: primaryKey(),
        pengunjung_id: notNullInteger(),
        createdAt: notNullDate(),
        updatedAt: notNullDate(),
      }),

      queryInterface.createTable("dokumen", {
        id: primaryKey(),
        nama: notNullString(70),
        description: notNullText(),
        jenis_file: notNullString(20),
        tipe_file: notNullString(20),
        file: notNullString(255),
        created_by: notNullString(35),
        updated_by: nullableString(35),
        createdAt: notNullDate(),
        updatedAt: notNullDate(),
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.dropTable("administrator"),
      queryInterface.dropTable("divisi"),
      queryInterface.dropTable("admin_divisi"),
      queryInterface.dropTable("pjAnggota"),
      queryInterface.dropTable("pjDokumen"),
      queryInterface.dropTable("pjEvent"),
      queryInterface.dropTable("agama"),
      queryInterface.dropTable("pengunjung"),
      queryInterface.dropTable("tamu"),
      queryInterface.dropTable("dokumen"),
      queryInterface.dropTable("anggota"),
      queryInterface.dropTable("event"),
      queryInterface.dropTable("tiket"),
    ]);
  },
};
