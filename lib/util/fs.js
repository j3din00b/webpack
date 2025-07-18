/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

const path = require("path");

/** @typedef {import("../../declarations/WebpackOptions").WatchOptions} WatchOptions */
/** @typedef {import("../FileSystemInfo").FileSystemInfoEntry} FileSystemInfoEntry */

/**
 * @template T
 * @typedef {object} IStatsBase
 * @property {() => boolean} isFile
 * @property {() => boolean} isDirectory
 * @property {() => boolean} isBlockDevice
 * @property {() => boolean} isCharacterDevice
 * @property {() => boolean} isSymbolicLink
 * @property {() => boolean} isFIFO
 * @property {() => boolean} isSocket
 * @property {T} dev
 * @property {T} ino
 * @property {T} mode
 * @property {T} nlink
 * @property {T} uid
 * @property {T} gid
 * @property {T} rdev
 * @property {T} size
 * @property {T} blksize
 * @property {T} blocks
 * @property {T} atimeMs
 * @property {T} mtimeMs
 * @property {T} ctimeMs
 * @property {T} birthtimeMs
 * @property {Date} atime
 * @property {Date} mtime
 * @property {Date} ctime
 * @property {Date} birthtime
 */

/**
 * @typedef {IStatsBase<number>} IStats
 */

/**
 * @typedef {IStatsBase<bigint> & { atimeNs: bigint, mtimeNs: bigint, ctimeNs: bigint, birthtimeNs: bigint  }} IBigIntStats
 */

/**
 * @template {string | Buffer} [T=string]
 * @typedef {object} Dirent
 * @property {() => boolean} isFile true when is file, otherwise false
 * @property {() => boolean} isDirectory true when is directory, otherwise false
 * @property {() => boolean} isBlockDevice true when is block device, otherwise false
 * @property {() => boolean} isCharacterDevice true when is character device, otherwise false
 * @property {() => boolean} isSymbolicLink true when is symbolic link, otherwise false
 * @property {() => boolean} isFIFO true when is FIFO, otherwise false
 * @property {() => boolean} isSocket true when is socket, otherwise false
 * @property {T} name name
 * @property {string} parentPath path
 * @property {string=} path path
 */

/** @typedef {string | number | boolean | null} JsonPrimitive */
/** @typedef {JsonValue[]} JsonArray */
/** @typedef {{[Key in string]: JsonValue} & {[Key in string]?: JsonValue | undefined}} JsonObject */
/** @typedef {JsonPrimitive | JsonObject | JsonArray} JsonValue */

/** @typedef {(err: NodeJS.ErrnoException | null) => void} NoParamCallback */
/** @typedef {(err: NodeJS.ErrnoException | null, result?: string) => void} StringCallback */
/** @typedef {(err: NodeJS.ErrnoException | null, result?: Buffer) => void} BufferCallback */
/** @typedef {(err: NodeJS.ErrnoException | null, result?: string | Buffer) => void} StringOrBufferCallback */
/** @typedef {(err: NodeJS.ErrnoException | null, result?: string[]) => void} ReaddirStringCallback */
/** @typedef {(err: NodeJS.ErrnoException | null, result?: Buffer[]) => void} ReaddirBufferCallback */
/** @typedef {(err: NodeJS.ErrnoException | null, result?: string[] | Buffer[]) => void} ReaddirStringOrBufferCallback */
/** @typedef {(err: NodeJS.ErrnoException | null, result?: Dirent[]) => void} ReaddirDirentCallback */
/** @typedef {(err: NodeJS.ErrnoException | null, result?: Dirent<Buffer>[]) => void} ReaddirDirentBufferCallback */
/** @typedef {(err: NodeJS.ErrnoException | null, result?: IStats) => void} StatsCallback */
/** @typedef {(err: NodeJS.ErrnoException | null, result?: IBigIntStats) => void} BigIntStatsCallback */
/** @typedef {(err: NodeJS.ErrnoException | null, result?: IStats | IBigIntStats) => void} StatsOrBigIntStatsCallback */
/** @typedef {(err: NodeJS.ErrnoException | null, result?: number) => void} NumberCallback */
/** @typedef {(err: NodeJS.ErrnoException | Error | null, result?: JsonObject) => void} ReadJsonCallback */

/** @typedef {Map<string, FileSystemInfoEntry | "ignore">} TimeInfoEntries */

/**
 * @typedef {object} WatcherInfo
 * @property {Set<string> | null} changes get current aggregated changes that have not yet send to callback
 * @property {Set<string> | null} removals get current aggregated removals that have not yet send to callback
 * @property {TimeInfoEntries} fileTimeInfoEntries get info about files
 * @property {TimeInfoEntries} contextTimeInfoEntries get info about directories
 */

/** @typedef {Set<string>} Changes */
/** @typedef {Set<string>} Removals */

// TODO webpack 6 deprecate missing getInfo
/**
 * @typedef {object} Watcher
 * @property {() => void} close closes the watcher and all underlying file watchers
 * @property {() => void} pause closes the watcher, but keeps underlying file watchers alive until the next watch call
 * @property {(() => Changes | null)=} getAggregatedChanges get current aggregated changes that have not yet send to callback
 * @property {(() => Removals | null)=} getAggregatedRemovals get current aggregated removals that have not yet send to callback
 * @property {() => TimeInfoEntries} getFileTimeInfoEntries get info about files
 * @property {() => TimeInfoEntries} getContextTimeInfoEntries get info about directories
 * @property {() => WatcherInfo=} getInfo get info about timestamps and changes
 */

/**
 * @callback WatchMethod
 * @param {Iterable<string>} files watched files
 * @param {Iterable<string>} directories watched directories
 * @param {Iterable<string>} missing watched existence entries
 * @param {number} startTime timestamp of start time
 * @param {WatchOptions} options options object
 * @param {(err: Error | null, timeInfoEntries1?: TimeInfoEntries, timeInfoEntries2?: TimeInfoEntries, changes?: Changes, removals?: Removals) => void} callback aggregated callback
 * @param {(value: string, num: number) => void} callbackUndelayed callback when the first change was detected
 * @returns {Watcher} a watcher
 */

// TODO webpack 6 make optional methods required and avoid using non standard methods like `join`, `relative`, `dirname`, move IntermediateFileSystemExtras methods to InputFilesystem or OutputFilesystem

/**
 * @typedef {string | Buffer | URL} PathLike
 */

/**
 * @typedef {PathLike | number} PathOrFileDescriptor
 */

/**
 * @typedef {object} ObjectEncodingOptions
 * @property {BufferEncoding | null | undefined=} encoding
 */

/**
 * @typedef {{
 * (path: PathOrFileDescriptor, options: ({ encoding?: null | undefined, flag?: string | undefined } & import("events").Abortable) | undefined | null, callback: BufferCallback): void;
 * (path: PathOrFileDescriptor, options: ({ encoding: BufferEncoding, flag?: string | undefined } & import("events").Abortable) | BufferEncoding, callback: StringCallback): void;
 * (path: PathOrFileDescriptor, options: (ObjectEncodingOptions & { flag?: string | undefined } & import("events").Abortable) | BufferEncoding | undefined | null, callback: StringOrBufferCallback): void;
 * (path: PathOrFileDescriptor, callback: BufferCallback): void;
 * }} ReadFile
 */

/**
 * @typedef {{
 * (path: PathOrFileDescriptor, options?: { encoding?: null | undefined, flag?: string | undefined } | null): Buffer;
 * (path: PathOrFileDescriptor, options: { encoding: BufferEncoding, flag?: string | undefined } | BufferEncoding): string;
 * (path: PathOrFileDescriptor, options?: (ObjectEncodingOptions & { flag?: string | undefined }) | BufferEncoding | null): string | Buffer;
 * }} ReadFileSync
 */

/**
 * @typedef {ObjectEncodingOptions | BufferEncoding | undefined | null} EncodingOption
 */

/**
 * @typedef {'buffer'| { encoding: 'buffer' }} BufferEncodingOption
 */

/**
 * @typedef {object} StatOptions
 * @property {(boolean | undefined)=} bigint
 */

/**
 * @typedef {object} StatSyncOptions
 * @property {(boolean | undefined)=} bigint
 * @property {(boolean | undefined)=} throwIfNoEntry
 */

/**
 * @typedef {{
 * (path: PathLike, options: EncodingOption, callback: StringCallback): void;
 * (path: PathLike, options: BufferEncodingOption, callback: BufferCallback): void;
 * (path: PathLike, options: EncodingOption, callback: StringOrBufferCallback): void;
 * (path: PathLike, callback: StringCallback): void;
 * }} Readlink
 */

/**
 * @typedef {{
 * (path: PathLike, options?: EncodingOption): string;
 * (path: PathLike, options: BufferEncodingOption): Buffer;
 * (path: PathLike, options?: EncodingOption): string | Buffer;
 * }} ReadlinkSync
 */

/**
 * @typedef {{
 * (path: PathLike, options: { encoding: BufferEncoding | null, withFileTypes?: false | undefined, recursive?: boolean | undefined } | BufferEncoding | undefined | null, callback: (err: NodeJS.ErrnoException | null, files?: string[]) => void): void;
 * (path: PathLike, options: { encoding: 'buffer', withFileTypes?: false | undefined, recursive?: boolean | undefined } | 'buffer', callback: (err: NodeJS.ErrnoException | null, files?: Buffer[]) => void): void;
 * (path: PathLike, options: (ObjectEncodingOptions & { withFileTypes?: false | undefined, recursive?: boolean | undefined }) | BufferEncoding | undefined | null, callback: (err: NodeJS.ErrnoException | null, files?: string[] | Buffer[]) => void): void;
 * (path: PathLike, callback: (err: NodeJS.ErrnoException | null, files?: string[]) => void): void;
 * (path: PathLike, options: ObjectEncodingOptions & { withFileTypes: true, recursive?: boolean | undefined }, callback: (err: NodeJS.ErrnoException | null, files?: Dirent<string>[]) => void): void;
 * (path: PathLike, options: { encoding: 'buffer', withFileTypes: true, recursive?: boolean | undefined }, callback: (err: NodeJS.ErrnoException | null, files: Dirent<Buffer>[]) => void): void;
 * }} Readdir
 */

/**
 * @typedef {{
 * (path: PathLike, options?: { encoding: BufferEncoding | null, withFileTypes?: false | undefined, recursive?: boolean | undefined; } | BufferEncoding | null): string[];
 * (path: PathLike, options: { encoding: 'buffer', withFileTypes?: false | undefined, recursive?: boolean | undefined } | 'buffer'): Buffer[];
 * (path: PathLike, options?: (ObjectEncodingOptions & { withFileTypes?: false | undefined, recursive?: boolean | undefined }) | BufferEncoding | null): string[] | Buffer[];
 * (path: PathLike, options: ObjectEncodingOptions & { withFileTypes: true, recursive?: boolean | undefined }): Dirent[];
 * (path: PathLike, options: { encoding: "buffer", withFileTypes: true, recursive?: boolean | undefined }): Dirent<Buffer>[];
 * }} ReaddirSync
 */

/**
 * @typedef {{
 * (path: PathLike, callback: StatsCallback): void;
 * (path: PathLike, options: (StatOptions & { bigint?: false | undefined }) | undefined, callback: StatsCallback): void;
 * (path: PathLike, options: StatOptions & { bigint: true }, callback: BigIntStatsCallback): void;
 * (path: PathLike, options: StatOptions | undefined, callback: StatsOrBigIntStatsCallback): void;
 * }} Stat
 */

/**
 * @typedef {{
 * (path: PathLike, options?: undefined): IStats;
 * (path: PathLike, options?: StatSyncOptions & { bigint?: false | undefined, throwIfNoEntry: false }): IStats | undefined;
 * (path: PathLike, options: StatSyncOptions & { bigint: true, throwIfNoEntry: false }): IBigIntStats | undefined;
 * (path: PathLike, options?: StatSyncOptions & { bigint?: false | undefined }): IStats;
 * (path: PathLike, options: StatSyncOptions & { bigint: true }): IBigIntStats;
 * (path: PathLike,  options: StatSyncOptions & { bigint: boolean, throwIfNoEntry?: false | undefined }): IStats | IBigIntStats;
 * (path: PathLike,  options?: StatSyncOptions): IStats | IBigIntStats | undefined;
 * }} StatSync
 */

/**
 * @typedef {{
 * (path: PathLike, callback: StatsCallback): void;
 * (path: PathLike, options: (StatOptions & { bigint?: false | undefined }) | undefined, callback: StatsCallback): void;
 * (path: PathLike, options: StatOptions & { bigint: true }, callback: BigIntStatsCallback): void;
 * (path: PathLike, options: StatOptions | undefined, callback: StatsOrBigIntStatsCallback): void;
 * }} LStat
 */

/**
 * @typedef {{
 * (path: PathLike, options?: undefined): IStats;
 * (path: PathLike, options?: StatSyncOptions & { bigint?: false | undefined, throwIfNoEntry: false }): IStats | undefined;
 * (path: PathLike, options: StatSyncOptions & { bigint: true, throwIfNoEntry: false }): IBigIntStats | undefined;
 * (path: PathLike, options?: StatSyncOptions & { bigint?: false | undefined }): IStats;
 * (path: PathLike, options: StatSyncOptions & { bigint: true }): IBigIntStats;
 * (path: PathLike,  options: StatSyncOptions & { bigint: boolean, throwIfNoEntry?: false | undefined }): IStats | IBigIntStats;
 * (path: PathLike,  options?: StatSyncOptions): IStats | IBigIntStats | undefined;
 * }} LStatSync
 */

/**
 * @typedef {{
 * (path: PathLike, options: EncodingOption, callback: StringCallback): void;
 * (path: PathLike, options: BufferEncodingOption, callback: BufferCallback): void;
 * (path: PathLike, options: EncodingOption, callback: StringOrBufferCallback): void;
 * (path: PathLike, callback: StringCallback): void;
 * }} RealPath
 */

/**
 * @typedef {{
 * (path: PathLike, options?: EncodingOption): string;
 * (path: PathLike, options: BufferEncodingOption): Buffer;
 * (path: PathLike, options?: EncodingOption): string | Buffer;
 * }} RealPathSync
 */

/**
 * @typedef {(pathOrFileDescriptor: PathOrFileDescriptor, callback: ReadJsonCallback) => void} ReadJson
 */

/**
 * @typedef {(pathOrFileDescriptor: PathOrFileDescriptor) => JsonObject} ReadJsonSync
 */

/**
 * @typedef {(value?: string | string[] | Set<string>) => void} Purge
 */

/**
 * @typedef {object} InputFileSystem
 * @property {ReadFile} readFile
 * @property {ReadFileSync=} readFileSync
 * @property {Readlink} readlink
 * @property {ReadlinkSync=} readlinkSync
 * @property {Readdir} readdir
 * @property {ReaddirSync=} readdirSync
 * @property {Stat} stat
 * @property {StatSync=} statSync
 * @property {LStat=} lstat
 * @property {LStatSync=} lstatSync
 * @property {RealPath=} realpath
 * @property {RealPathSync=} realpathSync
 * @property {ReadJson=} readJson
 * @property {ReadJsonSync=} readJsonSync
 * @property {Purge=} purge
 * @property {((path1: string, path2: string) => string)=} join
 * @property {((from: string, to: string) => string)=} relative
 * @property {((dirname: string) => string)=} dirname
 */

/**
 * @typedef {number | string} Mode
 */

/**
 * @typedef {(ObjectEncodingOptions & import("events").Abortable & { mode?: Mode | undefined, flag?: string | undefined, flush?: boolean | undefined }) | BufferEncoding | null} WriteFileOptions
 */

/**
 * @typedef {{
 * (file: PathOrFileDescriptor, data: string | NodeJS.ArrayBufferView, options: WriteFileOptions, callback: NoParamCallback): void;
 * (file: PathOrFileDescriptor, data: string | NodeJS.ArrayBufferView, callback: NoParamCallback): void;
 * }} WriteFile
 */

/**
 * @typedef {{ recursive?: boolean | undefined, mode?: Mode | undefined }} MakeDirectoryOptions
 */

/**
 * @typedef {{
 * (file: PathLike, options: MakeDirectoryOptions & { recursive: true }, callback: StringCallback): void;
 * (file: PathLike, options: Mode | (MakeDirectoryOptions & { recursive?: false | undefined; }) | null | undefined, callback: NoParamCallback): void;
 * (file: PathLike, options: Mode | MakeDirectoryOptions | null | undefined, callback: StringCallback): void;
 * (file: PathLike, callback: NoParamCallback): void;
 * }} Mkdir
 */

/**
 * @typedef {{ maxRetries?: number | undefined, recursive?: boolean | undefined, retryDelay?: number | undefined }} RmDirOptions
 */

/**
 * @typedef {{
 * (file: PathLike, callback: NoParamCallback): void;
 * (file: PathLike, options: RmDirOptions, callback: NoParamCallback): void;
 * }} Rmdir
 */

/**
 * @typedef {(pathLike: PathLike, callback: NoParamCallback) => void} Unlink
 */

/**
 * @typedef {object} OutputFileSystem
 * @property {WriteFile} writeFile
 * @property {Mkdir} mkdir
 * @property {Readdir=} readdir
 * @property {Rmdir=} rmdir
 * @property {Unlink=} unlink
 * @property {Stat} stat
 * @property {LStat=} lstat
 * @property {ReadFile} readFile
 * @property {((path1: string, path2: string) => string)=} join
 * @property {((from: string, to: string) => string)=} relative
 * @property {((dirname: string) => string)=} dirname
 */

/**
 * @typedef {object} WatchFileSystem
 * @property {WatchMethod} watch
 */

/**
 * @typedef {{
 * (path: PathLike, options: MakeDirectoryOptions & { recursive: true }): string | undefined;
 * (path: PathLike, options?: Mode | (MakeDirectoryOptions & { recursive?: false | undefined }) | null): void;
 * (path: PathLike, options?: Mode | MakeDirectoryOptions | null): string | undefined;
 * }} MkdirSync
 */

/**
 * @typedef {object} StreamOptions
 * @property {(string | undefined)=} flags
 * @property {(BufferEncoding | undefined)} encoding
 * @property {(number | EXPECTED_ANY | undefined)=} fd
 * @property {(number | undefined)=} mode
 * @property {(boolean | undefined)=} autoClose
 * @property {(boolean | undefined)=} emitClose
 * @property {(number | undefined)=} start
 * @property {(AbortSignal | null | undefined)=} signal
 */

/**
 * @typedef {object} FSImplementation
 * @property {((...args: EXPECTED_ANY[]) => EXPECTED_ANY)=} open
 * @property {((...args: EXPECTED_ANY[]) => EXPECTED_ANY)=} close
 */

/**
 * @typedef {FSImplementation & { write: (...args: EXPECTED_ANY[]) => EXPECTED_ANY; close?: (...args: EXPECTED_ANY[]) => EXPECTED_ANY }} CreateWriteStreamFSImplementation
 */

/**
 * @typedef {StreamOptions & { fs?: CreateWriteStreamFSImplementation | null | undefined }} WriteStreamOptions
 */

/**
 * @typedef {(pathLike: PathLike, result?: BufferEncoding | WriteStreamOptions) => NodeJS.WritableStream} CreateWriteStream
 */

/**
 * @typedef {number | string} OpenMode
 */

/**
 * @typedef {{
 * (file: PathLike, flags: OpenMode | undefined,  mode: Mode | undefined | null, callback: NumberCallback): void;
 * (file: PathLike, flags: OpenMode | undefined, callback: NumberCallback): void;
 * (file: PathLike, callback: NumberCallback): void;
 * }} Open
 */

/**
 * @typedef {number | bigint} ReadPosition
 */

/**
 * @typedef {object} ReadSyncOptions
 * @property {(number | undefined)=} offset
 * @property {(number | undefined)=} length
 * @property {(ReadPosition | null | undefined)=} position
 */

/**
 * @template {NodeJS.ArrayBufferView} TBuffer
 * @typedef {object} ReadAsyncOptions
 * @property {(number | undefined)=} offset
 * @property {(number | undefined)=} length
 * @property {(ReadPosition | null | undefined)=} position
 * @property {TBuffer=} buffer
 */

/**
 * @template {NodeJS.ArrayBufferView} [TBuffer=NodeJS.ArrayBufferView]
 * @typedef {{
 * (fd: number, buffer: TBuffer, offset: number, length: number, position: ReadPosition | null, callback: (err: NodeJS.ErrnoException | null, bytesRead: number, buffer: TBuffer) => void): void;
 * (fd: number, options: ReadAsyncOptions<TBuffer>, callback: (err: NodeJS.ErrnoException | null, bytesRead: number, buffer: TBuffer) => void): void;
 * (fd: number, callback: (err: NodeJS.ErrnoException | null, bytesRead: number, buffer: NodeJS.ArrayBufferView) => void): void;
 * }} Read
 */

/** @typedef {(df: number, callback: NoParamCallback) => void} Close */

/** @typedef {(a: PathLike, b: PathLike, callback: NoParamCallback) => void} Rename */

/**
 * @typedef {object} IntermediateFileSystemExtras
 * @property {MkdirSync} mkdirSync
 * @property {CreateWriteStream} createWriteStream
 * @property {Open} open
 * @property {Read} read
 * @property {Close} close
 * @property {Rename} rename
 */

/** @typedef {InputFileSystem & OutputFileSystem & IntermediateFileSystemExtras} IntermediateFileSystem */

/**
 * @param {InputFileSystem|OutputFileSystem|undefined} fs a file system
 * @param {string} rootPath the root path
 * @param {string} targetPath the target path
 * @returns {string} location of targetPath relative to rootPath
 */
const relative = (fs, rootPath, targetPath) => {
	if (fs && fs.relative) {
		return fs.relative(rootPath, targetPath);
	} else if (path.posix.isAbsolute(rootPath)) {
		return path.posix.relative(rootPath, targetPath);
	} else if (path.win32.isAbsolute(rootPath)) {
		return path.win32.relative(rootPath, targetPath);
	}
	throw new Error(
		`${rootPath} is neither a posix nor a windows path, and there is no 'relative' method defined in the file system`
	);
};

/**
 * @param {InputFileSystem|OutputFileSystem|undefined} fs a file system
 * @param {string} rootPath a path
 * @param {string} filename a filename
 * @returns {string} the joined path
 */
const join = (fs, rootPath, filename) => {
	if (fs && fs.join) {
		return fs.join(rootPath, filename);
	} else if (path.posix.isAbsolute(rootPath)) {
		return path.posix.join(rootPath, filename);
	} else if (path.win32.isAbsolute(rootPath)) {
		return path.win32.join(rootPath, filename);
	}
	throw new Error(
		`${rootPath} is neither a posix nor a windows path, and there is no 'join' method defined in the file system`
	);
};

/**
 * @param {InputFileSystem|OutputFileSystem|undefined} fs a file system
 * @param {string} absPath an absolute path
 * @returns {string} the parent directory of the absolute path
 */
const dirname = (fs, absPath) => {
	if (fs && fs.dirname) {
		return fs.dirname(absPath);
	} else if (path.posix.isAbsolute(absPath)) {
		return path.posix.dirname(absPath);
	} else if (path.win32.isAbsolute(absPath)) {
		return path.win32.dirname(absPath);
	}
	throw new Error(
		`${absPath} is neither a posix nor a windows path, and there is no 'dirname' method defined in the file system`
	);
};

/**
 * @param {OutputFileSystem} fs a file system
 * @param {string} p an absolute path
 * @param {(err?: Error) => void} callback callback function for the error
 * @returns {void}
 */
const mkdirp = (fs, p, callback) => {
	fs.mkdir(p, (err) => {
		if (err) {
			if (err.code === "ENOENT") {
				const dir = dirname(fs, p);
				if (dir === p) {
					callback(err);
					return;
				}
				mkdirp(fs, dir, (err) => {
					if (err) {
						callback(err);
						return;
					}
					fs.mkdir(p, (err) => {
						if (err) {
							if (err.code === "EEXIST") {
								callback();
								return;
							}
							callback(err);
							return;
						}
						callback();
					});
				});
				return;
			} else if (err.code === "EEXIST") {
				callback();
				return;
			}
			callback(err);
			return;
		}
		callback();
	});
};

/**
 * @param {IntermediateFileSystem} fs a file system
 * @param {string} p an absolute path
 * @returns {void}
 */
const mkdirpSync = (fs, p) => {
	try {
		fs.mkdirSync(p);
	} catch (err) {
		if (err) {
			if (/** @type {NodeJS.ErrnoException} */ (err).code === "ENOENT") {
				const dir = dirname(fs, p);
				if (dir === p) {
					throw err;
				}
				mkdirpSync(fs, dir);
				fs.mkdirSync(p);
				return;
			} else if (/** @type {NodeJS.ErrnoException} */ (err).code === "EEXIST") {
				return;
			}
			throw err;
		}
	}
};

/**
 * @param {InputFileSystem} fs a file system
 * @param {string} p an absolute path
 * @param {ReadJsonCallback} callback callback
 * @returns {void}
 */
const readJson = (fs, p, callback) => {
	if ("readJson" in fs) {
		return /** @type {NonNullable<InputFileSystem["readJson"]>} */ (
			fs.readJson
		)(p, callback);
	}
	fs.readFile(p, (err, buf) => {
		if (err) return callback(err);
		let data;
		try {
			data = JSON.parse(/** @type {Buffer} */ (buf).toString("utf8"));
		} catch (err1) {
			return callback(/** @type {Error} */ (err1));
		}
		return callback(null, data);
	});
};

/**
 * @param {InputFileSystem} fs a file system
 * @param {string} p an absolute path
 * @param {(err: NodeJS.ErrnoException | Error | null, stats?: IStats | string) => void} callback callback
 * @returns {void}
 */
const lstatReadlinkAbsolute = (fs, p, callback) => {
	let i = 3;
	const doReadLink = () => {
		fs.readlink(p, (err, target) => {
			if (err && --i > 0) {
				// It might was just changed from symlink to file
				// we retry 2 times to catch this case before throwing the error
				return doStat();
			}
			if (err) return callback(err);
			const value = /** @type {string} */ (target).toString();
			callback(null, join(fs, dirname(fs, p), value));
		});
	};
	const doStat = () => {
		if ("lstat" in fs) {
			return /** @type {NonNullable<InputFileSystem["lstat"]>} */ (fs.lstat)(
				p,
				(err, stats) => {
					if (err) return callback(err);
					if (/** @type {IStats} */ (stats).isSymbolicLink()) {
						return doReadLink();
					}
					callback(null, stats);
				}
			);
		}
		return fs.stat(p, callback);
	};
	if ("lstat" in fs) return doStat();
	doReadLink();
};

module.exports.dirname = dirname;
module.exports.join = join;
module.exports.lstatReadlinkAbsolute = lstatReadlinkAbsolute;
module.exports.mkdirp = mkdirp;
module.exports.mkdirpSync = mkdirpSync;
module.exports.readJson = readJson;
module.exports.relative = relative;
